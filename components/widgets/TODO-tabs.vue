<template
  ><div class="mb-4">
    <div role="tabslist" class="flex flex-row justify-between">
      <h3
        id="tab-1"
        role="tab"
        :aria-selected="filterTabs.selectedTab === 0 ? 'true' : 'false'"
        aria-controls="panel-1"
        tabindex="0"
        class="rounded-t-lg bg-lightgrey p-2 cursor-pointer hover:bg-southern hover:text-white w-1/2 md:w-auto flex flex-row items-center justify-start"
        :class="filterTabs.selectedTab === 0 ? 'bg-southern text-white' : ''"
        @click="toggleTab(0)"
      >
        Filters
        <span v-if="totalFiltersApplied > 0"
          >({{ totalFiltersApplied }} applied)</span
        >
        <font-awesome-icon
          v-if="filterTabs.selectedTab === 0"
          :icon="['fa', 'times']"
          class="text-darkgrey ml-auto"
        />
      </h3>
      <h3
        id="tab-2"
        role="tab"
        :aria-selected="filterTabs.selectedTab === 1 ? 'true' : 'false'"
        aria-controls="panel-2"
        tabindex="1"
        class="rounded-t-lg bg-lightgrey p-2 cursor-pointer hover:bg-southern hover:text-white w-1/2 md:w-auto flex flex-row items-center justify-start"
        :class="filterTabs.selectedTab === 1 ? 'bg-southern text-white' : ''"
        @click="toggleTab(1)"
      >
        Sort ({{ currentSortOrder }})
        <font-awesome-icon
          v-if="filterTabs.selectedTab === 1"
          :icon="['fa', 'times']"
          class="text-darkgrey ml-auto"
        />
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
          :is-active="hillList.filters.bagged === 'all'"
          class="bg-darkgrey text-white mb-2 mr-2"
          @click="filterByBagged('all')"
          >All</BasePill
        >
        <BasePill
          :is-active="hillList.filters.bagged === 'bagged'"
          class="bg-darkgrey text-white mb-2 mr-2"
          @click="filterByBagged('bagged')"
          >Bagged</BasePill
        >
        <BasePill
          :is-active="hillList.filters.bagged === 'unbagged'"
          class="bg-darkgrey text-white mb-2 mr-2"
          @click="filterByBagged('unbagged')"
          >Not bagged</BasePill
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
      <div class="flex flex-row justify-end">
        <BasePill
          :is-active="hillList.sort === 'desc'"
          class="bg-darkgrey text-white mr-2"
          @click="sortByHeight('desc')"
          >High-Low</BasePill
        >
        <BasePill
          :is-active="hillList.sort === 'asc'"
          class="bg-darkgrey text-white"
          @click="sortByHeight('asc')"
          >Low-High</BasePill
        >
      </div>
    </div>
  </div>
</template>
