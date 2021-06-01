<template>
  <div>
    <div class="grid grid-cols-12 gap-4">
      <div class="form-section col-span-12">
        <BaseInput
          id="hills-search-filter"
          v-model="search"
          label="Find a fell:"
          type="text"
          placeholder="Search by fell name"
        />
        <BagStatusPills
          v-if="currentUserId"
          class="flex flex-row flex-wrap py-2"
        />
        <div>
          <p @click="toggleFilters">Filters +</p>
          <div v-show="showFilters"><AreaPills class="py-2" /></div>
        </div>
      </div>
      <div class="col-span-12">
        <div class="flex flex-row flex-wrap justify-end pb-2">
          <BasePill
            :is-active="hillList.sort === 'desc'"
            class="bg-lightgrey ml-2 mb-2"
            @click="sortByHeight('desc')"
            >High-Low</BasePill
          >
          <BasePill
            :is-active="hillList.sort === 'asc'"
            class="bg-lightgrey ml-2 mb-2"
            @click="sortByHeight('asc')"
            >Low-High</BasePill
          >
          <BasePill
            :is-active="hillList.sort === 'az'"
            class="bg-lightgrey ml-2 mb-2"
            @click="sortByFirstLetter('az')"
            >A-Z</BasePill
          >
          <BasePill
            :is-active="hillList.sort === 'za'"
            class="bg-lightgrey ml-2 mb-2"
            @click="sortByFirstLetter('za')"
            >Z-A</BasePill
          >
        </div>

        <template v-if="filteredHills.length > 0">
          <div class="grid grid-cols-12 gap-4">
            <HillCard
              v-for="hill in sortedHills"
              :key="hill.id"
              :hill="hill"
              class="col-span-12 sm:col-span-6 lg:col-span-4"
            />
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
import BagStatusPills from '@/components/user/BagStatusPills.vue'
import HillCard from '@/components/hills/HillCard.vue'

import calculateDistances from '@/mixins/calculateDistances.js'

export default {
  components: {
    HillCard,
    // BagCreateModal,
    BagStatusPills,
    AreaPills,
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
