<template>
  <div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-4">
        <!-- <BaseInfoBar class="col-span-12">
        <p>
          Welcome to Fell Baggr, an app to help plan and record your mission to
          climb some, or all, of the Lake District fells listed in the classic
          walking guides of A.W. Wainwright.
        </p>
      </BaseInfoBar> -->
        <BaseInfoBar class="col-span-12">
          <h2 class="uppercase font-bold text-lg mb-2">Search</h2>
          <BaseInput
            id="hills-search-filter"
            v-model="search"
            label="By name: "
            type="text"
            placeholder="Search by fell name"
          />
        </BaseInfoBar>
        <BaseInfoBar class="col-span-12">
          <h2 class="uppercase font-bold text-lg mb-2">Browse</h2>
          <BaseFilter
            filter-name="fellsByArea"
            info="Refers to Wainwright's division of the Lakeland fells into 7 geographical areas, each covered in one of his guidebooks."
          >
            <template v-slot:label>By area</template>
            <template v-slot:filters><AreaPills /></template>
          </BaseFilter>
          <!-- <BaseFilter
            filter-name="fellsByTown"
            info="Shows only those fells which are located within 5km (as the crow flies) of the selected town"
          >
            <template v-slot:label>By nearby town</template>
            <template v-slot:filters><VicinityPills /></template>
          </BaseFilter> -->
          <BaseFilter v-if="currentUserId" filter-name="fellsByStatus">
            <template v-slot:label>By bagged status</template>
            <template v-slot:filters>
              <BagStatusPills v-if="currentUserId"
            /></template>
          </BaseFilter>
        </BaseInfoBar>
      </div>
      <div class="col-span-12 lg:col-span-8">
        <div class="sm:flex flex-row flex-wrap items-center justify-between">
          <p class="mb-2 sm:mb-0">Total matches: {{ totalFilteredHills }}</p>
          <BasePills class="justify-end">
            <BasePill
              :is-active="hillList.sort === 'desc'"
              class="bg-lightgrey"
              @click="sortByHeight('desc')"
              >High-Low</BasePill
            >
            <BasePill
              :is-active="hillList.sort === 'asc'"
              class="bg-lightgrey"
              @click="sortByHeight('asc')"
              >Low-High</BasePill
            >
            <BasePill
              :is-active="hillList.sort === 'az'"
              class="bg-lightgrey"
              @click="sortByFirstLetter('az')"
              >A-Z</BasePill
            >
            <BasePill
              :is-active="hillList.sort === 'za'"
              class="bg-lightgrey"
              @click="sortByFirstLetter('za')"
              >Z-A</BasePill
            >
          </BasePills>
        </div>

        <template v-if="filteredHills.length > 0">
          <div class="grid grid-cols-min15rem gap-4">
            <HillCard v-for="hill in sortedHills" :key="hill.id" :hill="hill" />
          </div>
        </template>
        <template v-else>
          <p class="mb-2">Sorry, there are no results for your search</p>
          <BaseButton button-class="bg-southern" @click="clearSearch()"
            >Start a new search</BaseButton
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import AreaPills from '@/components/hills/AreaPills.vue'
// import VicinityPills from '@/components/hills/VicinityPills.vue'
import BagStatusPills from '@/components/user/BagStatusPills.vue'
import HillCard from '@/components/hills/HillCard.vue'

import calculateDistances from '@/mixins/calculateDistances.js'

export default {
  components: {
    HillCard,
    // BagCreateModal,
    BagStatusPills,
    AreaPills,
    // VicinityPills,
  },
  mixins: [calculateDistances],
  data() {
    return {
      search: '',
      showBagCreateModal: false,
      showFilters: false,
      filterTabs: {
        selectedTab: '',
      },
    }
  },
  computed: {
    ...mapGetters('hills', ['getHills']),
    ...mapState({
      hillList: (state) => state.hills.hillList,
      currentUser: (state) => state.users.currentUser,
      currentUserId: (state) => state.users.currentUserId,
      user: (state) => state.users.user,
    }),
    hills() {
      let hills = [...this.getHills]
      return hills
    },
    totalFilteredHills() {
      return this.filteredHills.length
    },
    filteredHills() {
      let hillsArray = this.hills

      //free text search
      if (this.search !== '')
        hillsArray = hillsArray.filter((hill) => {
          return hill.name.toLowerCase().includes(this.search.toLowerCase())
        })

      //filters
      //by area
      if (this.hillList.filters.area.length > 0)
        hillsArray = hillsArray.filter((hill) => {
          return this.hillList.filters.area.includes(hill.area)
        })

      if (this.hillList.filters.bagged !== 'all')
        switch (this.hillList.filters.bagged) {
          case 'bagged':
            hillsArray = hillsArray.filter((hill) => {
              return this.user.hillsBagged.includes(hill.id)
            })
            break
          case 'unbagged':
            hillsArray = hillsArray.filter((hill) => {
              return !this.user.hillsBagged.includes(hill.id)
            })
            break
        }

      return hillsArray
    },
    sortedHills() {
      let hillsArray = this.filteredHills
      if (this.hillList.sort === 'vicinity') {
        if (this.$geolocation.coords) {
          let userLoc = {
            lat: this.$geolocation.coords.latitude,
            lng: this.$geolocation.coords.longitude,
          }
          hillsArray = this.findDistancesFromLoc(userLoc, hillsArray)
        } else {
          console.log('User location not available')
        }
        // console.log(this)
      } else if (this.hillList.sort === 'az') {
        hillsArray.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
      } else if (this.hillList.sort === 'za') {
        hillsArray.sort((a, b) => {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          return 0
        })
      } else if (this.hillList.sort === 'desc') {
        hillsArray.sort((a, b) => {
          if (a.height_m > b.height_m) return -1
          if (a.height_m < b.height_m) return 1
          return 0
        })
      } else {
        hillsArray.sort((a, b) => {
          if (a.height_m < b.height_m) return -1
          if (a.height_m > b.height_m) return 1
          return 0
        })
      }
      return hillsArray
    },
    totalFiltersApplied() {
      const areaFilters = parseInt(this.hillList.filters.area.length)
      const baggedFilter = parseInt(
        this.hillList.filters.bagged === 'all' ? '0' : '1'
      )
      return areaFilters + baggedFilter
    },
    currentSortOrder() {
      return this.hillList.sort === 'asc' ? 'Low-High' : 'High-Low'
    },
  },
  methods: {
    ...mapActions('users', ['closeBagModal']),
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    toggleTab(tabIndex) {
      if (this.filterTabs.selectedTab !== tabIndex) {
        this.filterTabs.selectedTab = tabIndex
      } else {
        this.filterTabs.selectedTab = ''
      }
    },
    tabIsSelected(tabIndex) {
      return tabIndex === this.filterTabs.selectedTab ? true : false
    },
    // filterByBagged(baggedStatus) {
    //   let filters = {
    //     bagged: baggedStatus,
    //   }
    //   this.$store.dispatch('hills/filterHillList', filters)
    // },
    sortByHeight(sortOrder) {
      this.$store.dispatch('hills/sortHillList', sortOrder)
    },
    sortByFirstLetter(sortOrder) {
      this.$store.dispatch('hills/sortHillList', sortOrder)
    },
    sortByVicinity() {
      this.$store.dispatch('hills/sortHillList', 'vicinity')
    },
    clearSearch() {
      let filters = {
        area: [],
        bagged: 'all',
      }
      this.search = ''
      this.filterTabs.selectedTab = ''
      this.$store.dispatch('hills/filterHillList', filters)
      this.$store.dispatch('hills/sortHillList', 'desc')
    },
  },
  mounted() {
    // this.$store.dispatch('pages/setPageTitle', 'Fells')

    if (this.totalFiltersApplied > 0) {
      this.filterTabs.selectedTab = 0
    }
  },
}
</script>
