<template>
  <BasePills>
    <BasePill
      v-for="town in sortedTowns"
      :key="town.slug"
      :is-active="isSelected(town.slug)"
      class="bg-theme-dark"
      @click="filterByTown(town.slug)"
      >{{ town.name }}</BasePill
    >
  </BasePills>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('hills', ['getTowns']),
    ...mapState({
      hillList: (state) => state.hills.hillList,
    }),
    selectedTown() {
      return this.hillList.filters.town
    },
    towns() {
      // https://stackoverflow.com/questions/52581488/how-can-i-clone-data-from-vuex-state-to-local-data
      let towns = [...this.getTowns]
      return towns
    },
    sortedTowns() {
      let sortedTowns = [...this.towns]
      return sortedTowns.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    },
  },
  methods: {
    filterByTown(townSlug) {
      // console.log('filter by vicinity to town ', townSlug)
      let filters = {
        town: townSlug,
      }
      this.$store.dispatch('hills/filterHillList', filters)
    },
    isSelected(townSlug) {
      return this.selectedTown === townSlug
    },
  },
}
</script>

<style lang="scss" scoped></style>
