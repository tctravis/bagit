<template>
  <div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-4 flow" style="--flow-space: 0.5rem">
        <BaseInfoBar class="col-span-12">
          <h2 class="uppercase font-bold text-lg mb-2 sr-only">Search</h2>
          <BaseInput
            id="hills-search-filter"
            v-model="search"
            label="Fell name"
            type="text"
            placeholder="Search by fell name"
            :label-above="false"
          />
        </BaseInfoBar>
        <BaseInfoBarCollapsible
          :show="hillList.filters.heightRanges.length > 0"
          class="col-span-12 flow"
        >
          <template #title><h2 class="text-md">Filter by height</h2></template>
          <template #content>
            <BaseFilter
              filter-name="fellsByHeightRange"
              :show-filter-name="false"
              info="Shows only those fells whose altitudes fall within the selected ranges"
            >
              <template v-slot:label>Height range (m)</template>
              <template v-slot:filters><HeightRangePills /></template>
            </BaseFilter>
          </template>
        </BaseInfoBarCollapsible>
        <BaseInfoBarCollapsible
          :show="hillList.filters.area.length > 0"
          class="col-span-12 flow"
        >
          <template #title><h2 class="text-md">Filter by area</h2></template>
          <template #content>
            <BaseFilter
              filter-name="fellsByArea"
              :show-filter-name="false"
              info="Refers to Wainwright's division of the Lakeland fells into 7 geographical areas, each covered in one of his guidebooks."
            >
              <template v-slot:label>By area:</template>
              <template v-slot:filters><AreaPills /></template>
            </BaseFilter>
          </template>
        </BaseInfoBarCollapsible>
        <BaseInfoBarCollapsible :show="false" class="col-span-12 flow">
          <template #title
            ><h2 class="text-md">Sort by nearby town</h2></template
          >
          <template #content>
            <BaseFilter
              filter-name="fellsByTown"
              :show-filter-name="false"
              info="Shows only those fells which are located within 5km (as the crow flies) of the selected town"
            >
              <template v-slot:label>Nearest to</template>
              <template v-slot:filters><VicinityPills /></template>
            </BaseFilter>
          </template>
        </BaseInfoBarCollapsible>
        <!-- <BaseFilter
              filter-name="fellsByTown"
              info="Shows only those fells which are located within 5km (as the crow flies) of the selected town"
            >
              <template v-slot:label>Nearest to</template>
              <template v-slot:filters><VicinityPills /></template>
            </BaseFilter>
            <BaseFilter
              filter-name="fellsByArea"
              info="Refers to Wainwright's division of the Lakeland fells into 7 geographical areas, each covered in one of his guidebooks."
            >
              <template v-slot:label>By area:</template>
              <template v-slot:filters><AreaPills /></template>
            </BaseFilter>
            <BaseFilter v-if="currentUserId" filter-name="fellsByStatus">
              <template v-slot:label>By bagged status:</template>
              <template v-slot:filters> <BagStatusPills /></template>
            </BaseFilter> -->

        <!-- <BaseInfoBarCollapsible :show="false" class="col-span-12">
          <template #title
            ><h2 class="uppercase font-bold text-lg">Sort</h2></template
          >
          <template #content>
            <BaseFilter
              filter-name="fellsByTown"
              info="Shows only those fells which are located within 5km (as the crow flies) of the selected town"
            >
              <template v-slot:label>Nearest to</template>
              <template v-slot:filters><VicinityPills /></template>
            </BaseFilter>
          </template>
        </BaseInfoBarCollapsible> -->
      </div>

      <div class="flow col-span-12 md:col-span-8">
        <!-- <div class="sm:flex flex-row flex-wrap items-center justify-between">
          <p class="sm:mb-0 text-white">
            Total matches: {{ totalFilteredHills }}
          </p>
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
        </div> -->

        <div class="flex flex-row flex-wrap items-center">
          <!-- <BasePill class="bg-darkdarkgrey text-white"
            >Results: {{ totalFilteredHills }}</BasePill
          > -->
          <p class="py-2 text-white">{{ totalFilteredHills }} results</p>
          <BagStatusPills class="ml-auto" />
          <!-- <BaseFilter v-if="currentUserId" filter-name="fellsByStatus">
            <template v-slot:label>By bagged status:</template>
            <template v-slot:filters> <BagStatusPills /></template>
          </BaseFilter> -->
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
import HeightRangePills from '@/components/hills/HeightRangePills.vue'
import VicinityPills from '@/components/hills/VicinityPills.vue'
import BagStatusPills from '@/components/user/BagStatusPills.vue'
import HillCard from '@/components/hills/HillCard.vue'

import calculateDistances from '@/mixins/calculateDistances.js'

export default {
  components: {
    HillCard,
    // BagCreateModal,
    BagStatusPills,
    AreaPills,
    VicinityPills,
    HeightRangePills,
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
    ...mapGetters('hills', ['getHills', 'getTowns']),
    ...mapState({
      hillList: (state) => state.hills.hillList,
      currentUser: (state) => state.users.currentUser,
      currentUserId: (state) => state.users.currentUserId,
      user: (state) => state.users.user,
    }),
    towns() {
      // https://stackoverflow.com/questions/52581488/how-can-i-clone-data-from-vuex-state-to-local-data
      let towns = [...this.getTowns]
      return towns
    },
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

      //by height range
      if (this.hillList.filters.heightRanges.length > 0) {
        hillsArray = hillsArray.filter((hill) => {
          return this.hillList.filters.heightRanges.find((heightRange) =>
            this.between(hill.height_m, heightRange.min, heightRange.max)
          )
        })
      }

      //by town
      if (this.hillList.filters.town) {
        let town = this.towns.find(
          (town) => town.slug === this.hillList.filters.town
        )
        hillsArray = this.findDistancesFromLoc(town.loc, hillsArray)
      }

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
      // if (this.hillList.sort === 'vicinity') {
      //   if (this.$geolocation.coords) {
      //     let userLoc = {
      //       lat: this.$geolocation.coords.latitude,
      //       lng: this.$geolocation.coords.longitude,
      //     }
      //     hillsArray = this.findDistancesFromLoc(userLoc, hillsArray)
      //   } else {
      //     console.log('User location not available')
      //   }
      //   // console.log(this)
      // } else if (this.hillList.sort === 'az') {
      //   hillsArray.sort((a, b) => {
      //     if (a.name < b.name) return -1
      //     if (a.name > b.name) return 1
      //     return 0
      //   })
      // } else if (this.hillList.sort === 'za') {
      //   hillsArray.sort((a, b) => {
      //     if (a.name > b.name) return -1
      //     if (a.name < b.name) return 1
      //     return 0
      //   })
      // } else if (this.hillList.sort === 'desc') {
      //   hillsArray.sort((a, b) => {
      //     if (a.height_m > b.height_m) return -1
      //     if (a.height_m < b.height_m) return 1
      //     return 0
      //   })
      // } else {
      //   hillsArray.sort((a, b) => {
      //     if (a.height_m < b.height_m) return -1
      //     if (a.height_m > b.height_m) return 1
      //     return 0
      //   })
      // }
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
    between(x, min, max) {
      return x >= min && x <= max
    },
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
