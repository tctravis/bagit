<template>
  <BasePills>
    <BasePill
      :is-active="this.bagStatusSelected === 'all'"
      class="bg-darkdarkgrey text-white"
      @click="filterByBagged('all')"
      >All</BasePill
    >
    <BasePill
      :is-active="this.bagStatusSelected === 'unbagged'"
      class="bg-darkdarkgrey text-white"
      @click="filterByBagged('unbagged')"
      >Unbagged</BasePill
    >
    <BasePill
      :is-active="this.bagStatusSelected === 'bagged'"
      class="bg-darkdarkgrey text-white"
      @click="filterByBagged('bagged')"
      >Bagged</BasePill
    >
  </BasePills>
</template>

<script>
export default {
  data() {
    return {
      bagStatusSelected: 'all',
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

<style lang="scss" scoped></style>
