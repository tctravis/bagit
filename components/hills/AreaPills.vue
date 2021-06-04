<template>
  <BasePills>
    <BasePill
      v-for="area in sortedAreas"
      :key="area.id"
      :is-active="isSelected(area.id)"
      :class="('bg-theme-' + area.name) | removeSpaces | lowercase"
      class="text-white"
      @click="filterByArea(area.id)"
      >{{ area.name }}</BasePill
    >
  </BasePills>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      areasSelected: [],
    }
  },
  computed: {
    ...mapGetters('hills', ['getAreas']),
    ...mapState({
      hillList: (state) => state.hills.hillList,
    }),
    areas() {
      // https://stackoverflow.com/questions/52581488/how-can-i-clone-data-from-vuex-state-to-local-data
      let areas = [...this.getAreas]
      return areas
    },
    sortedAreas() {
      let sortedAreas = [...this.areas]
      return sortedAreas.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    },
  },
  methods: {
    toggleAreaSelection(areaId) {
      let areaFilters = [...this.areasSelected]
      if (areaFilters.includes(areaId)) {
        areaFilters = areaFilters.filter((item) => item !== areaId)
      } else {
        areaFilters.push(areaId)
      }
      this.areasSelected = areaFilters
    },
    filterByArea(areaId) {
      this.toggleAreaSelection(areaId)
      let filters = {
        area: this.areasSelected,
      }
      this.$store.dispatch('hills/filterHillList', filters)
    },
    isSelected(areaId) {
      return this.hillList.filters.area.includes(areaId)
    },
  },
}
</script>

<style lang="scss" scoped></style>
