<template>
  <div>
    <BasePageTitle><template v-slot:title>Wainwrights</template></BasePageTitle>
    <div class="form-section">
      <BaseInput
        id="hills-search-filter"
        v-model="search"
        label="Fell name:"
        type="text"
        placeholder="Search by fell name"
      />
    </div>
    <div class="mb-4">
      <div role="tabslist" class="flex flex-row justify-between">
        <h3
          role="tab"
          :aria-selected="filterTabs.selectedTab === 0 ? 'true' : 'false'"
          aria-controls="panel-1"
          id="tab-1"
          tabindex="0"
          @click="openTab"
          class="rounded-t-lg bg-lightgrey p-2 cursor-pointer hover:bg-southern hover:text-white w-1/2 md:w-auto"
          :class="filterTabs.selectedTab === 0 ? 'bg-southern text-white' : ''"
        >
          Filters
        </h3>
        <h3
          role="tab"
          :aria-selected="filterTabs.selectedTab === 1 ? 'true' : 'false'"
          aria-controls="panel-2"
          id="tab-2"
          tabindex="1"
          @click="openTab"
          class="rounded-t-lg bg-lightgrey p-2 cursor-pointer hover:bg-southern hover:text-white w-1/2 md:w-auto"
          :class="filterTabs.selectedTab === 1 ? 'bg-southern text-white' : ''"
        >
          Sort
        </h3>
      </div>
      <div
        v-if="filterTabs.selectedTab === 0"
        id="panel-1"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="tab-1"
        class="p-2 bg-lightgrey border-t-2 border-southern"
      >
        <p class="mb-2">By area</p>
        <AreaPills />
        <p class="mb-2">By status</p>
        <div class="flex flex-row flex-wrap">
          <BasePill
            @click="filterByBagged('all')"
            class="bg-darkgrey text-white mb-2 mr-2"
            >All<span
              v-if="hillList.filters.bagged === 'all'"
              class="ml-2 rounded-full bg-white text-darkgrey w-6 inline-block text-center"
              >x</span
            ></BasePill
          >
          <BasePill
            @click="filterByBagged('bagged')"
            class="bg-darkgrey text-white mb-2 mr-2"
            >Bagged<span
              v-if="hillList.filters.bagged === 'bagged'"
              class="ml-2 rounded-full bg-white text-darkgrey w-6 inline-block text-center"
              >x</span
            ></BasePill
          >
          <BasePill
            @click="filterByBagged('unbagged')"
            class="bg-darkgrey text-white mb-2 mr-2"
            >Not bagged<span
              v-if="hillList.filters.bagged === 'unbagged'"
              class="ml-2 rounded-full bg-white text-darkgrey w-6 inline-block text-center"
              >x</span
            ></BasePill
          >
        </div>
      </div>
      <div
        v-if="filterTabs.selectedTab === 1"
        id="panel-2"
        role="tabpanel"
        tabindex="1"
        aria-labelledby="tab-2"
        class="p-2 bg-lightgrey border-t-2 border-southern"
      >
        <p>High-Low | Low-High</p>
      </div>
    </div>
    <template v-if="filteredHills.length > 0">
      <HillListItem
        v-for="hill in filteredHills"
        :key="hill.rank"
        :hill="hill"
        :hills-bagged="user.hillsBagged"
      />
    </template>
    <template v-else>
      <p>Sorry, there are no results for your search</p>
    </template>
    <BagCreateModal />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AreaPills from '@/components/hills/AreaPills.vue'
import HillListItem from '@/components/hills/HillListItem.vue'
import BagCreateModal from '@/components/user/BagCreateModal.vue'

export default {
  components: {
    HillListItem,
    BagCreateModal,
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
  },
  methods: {
    ...mapActions('users', ['closeBagModal']),
    openTab(e) {
      let currentTab = e.target.tabIndex
      this.filterTabs.selectedTab = currentTab
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
  },
  mounted() {
    this.closeBagModal()
  },
}
</script>
