<template>
  <div class="flex flex-row flex-wrap py-2">
    <BasePill
      :is-active="this.bagStatusSelected === 'unbagged'"
      class="bg-darkgrey text-white mb-2 mr-2"
      @click="filterByBagged('unbagged')"
      >Unbagged</BasePill
    >
    <BasePill
      :is-active="this.bagStatusSelected === 'bagged'"
      class="bg-darkgrey text-white mb-2 mr-2"
      @click="filterByBagged('bagged')"
      >Bagged</BasePill
    >
    <BasePill
      :is-active="this.bagStatusSelected === 'all'"
      class="bg-darkgrey text-white mb-2 mr-2"
      @click="filterByBagged('all')"
      >All</BasePill
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      bagStatusSelected: 'unbagged',
    }
  },
  methods: {
    filterByBagged(baggedStatus) {
      this.bagStatusSelected = baggedStatus
      let filters = {
        bagged: baggedStatus,
      }
      this.$store.dispatch('hills/filterHillList', filters)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>