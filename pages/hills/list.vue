<template>
  <div>
    <BasePageTitle>
      <template v-slot:title>Fells</template>
    </BasePageTitle>
    <div class="grid grid-cols-12 gap-4">
      <div class="form-section col-span-12 md:col-span-4">
        <BaseInput
          id="hills-search-filter"
          v-model="search"
          label="Find a fell:"
          type="text"
          placeholder="Search by fell name"
        />
        <AreaPills class="py-2" />
        <div class="flex flex-row flex-wrap py-2">
          <BasePill
            :is-active="hillList.filters.bagged === 'all'"
            class="bg-darkgrey text-white mb-2 mr-2"
            @click="filterByBagged('all')"
          >All</BasePill>
          <BasePill
            :is-active="hillList.filters.bagged === 'bagged'"
            class="bg-darkgrey text-white mb-2 mr-2"
            @click="filterByBagged('bagged')"
          >Bagged</BasePill>
          <BasePill
            :is-active="hillList.filters.bagged === 'unbagged'"
            class="bg-darkgrey text-white mb-2 mr-2"
            @click="filterByBagged('unbagged')"
          >Not bagged</BasePill>
        </div>
      </div>
      <div class="col-span-12 md:col-span-8">
        <div class="flex flex-row justify-end py-2">
          <BasePill
            :is-active="hillList.sort === 'desc'"
            class="bg-lightgrey mr-2"
            @click="sortByHeight('desc')"
          >High-Low</BasePill>
          <BasePill
            :is-active="hillList.sort === 'asc'"
            class="bg-lightgrey"
            @click="sortByHeight('asc')"
          >Low-High</BasePill>
        </div>

        <template v-if="filteredHills.length > 0">
          <HillListItem v-for="hill in sortedHills" :key="hill.rank" :hill="hill" />
        </template>
        <template v-else>
          <p class="mb-2">Sorry, there are no results for your search</p>
          <BaseButton button-class="bg-southern" @click="clearSearch()">Start a new search</BaseButton>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AreaPills from '@/components/hills/AreaPills.vue'
import HillListItem from '@/components/hills/HillListItem.vue'

export default {
  components: {
    HillListItem,
    // BagCreateModal,
    AreaPills,
  },
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
      if (this.hillList.sort === 'desc') {
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
    filterByBagged(baggedStatus) {
      let filters = {
        bagged: baggedStatus,
      }
      this.$store.dispatch('hills/filterHillList', filters)
    },
    sortByHeight(sortOrder) {
      this.$store.dispatch('hills/sortHillList', sortOrder)
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
    //this.closeBagModal()
    if (this.totalFiltersApplied > 0) {
      this.filterTabs.selectedTab = 0
    }
  },
}
</script>
