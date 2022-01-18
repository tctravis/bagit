<template>
  <BasePills>
    <BasePill
      v-for="heightRange in heightRanges"
      :key="heightRange.range.max"
      :is-active="isSelected(heightRange.range)"
      class="bg-northern text-white"
      @click="filterByHeightRange(heightRange.range)"
      >{{ heightRange.label }}</BasePill
    >
  </BasePills>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      heightRanges: [
        {
          label: 'Up to 600m',
          range: {
            min: 0,
            max: 599,
          },
        },
        {
          label: '600m - 700m',
          range: {
            min: 600,
            max: 699,
          },
        },
        {
          label: '700m - 800m',
          range: {
            min: 700,
            max: 799,
          },
        },
        {
          label: 'Over  800m',
          range: {
            min: 800,
            max: 9999,
          },
        },
      ],
      heightRangesSelected: [],
    }
  },
  computed: {
    // ...mapGetters('hills', ['getAreas']),
    ...mapState({
      hillList: (state) => state.hills.hillList,
    }),
    //   areas() {
    //     // https://stackoverflow.com/questions/52581488/how-can-i-clone-data-from-vuex-state-to-local-data
    //     let areas = [...this.getAreas]
    //     return areas
    //   },
    //   sortedAreas() {
    //     let sortedAreas = [...this.areas]
    //     return sortedAreas.sort((a, b) => {
    //       if (a.name < b.name) return -1
    //       if (a.name > b.name) return 1
    //       return 0
    //     })
    //   },
  },
  methods: {
    toggleHeightRangesSelection(heightRange) {
      let heightRangeFilters = [...this.heightRangesSelected]
      if (heightRangeFilters.includes(heightRange)) {
        heightRangeFilters = heightRangeFilters.filter(
          (item) => item !== heightRange
        )
      } else {
        heightRangeFilters.push(heightRange)
      }
      this.heightRangesSelected = heightRangeFilters
    },
    filterByHeightRange(heightRange) {
      console.log(heightRange)
      this.toggleHeightRangesSelection(heightRange)
      let filters = {
        heightRanges: this.heightRangesSelected,
      }
      this.$store.dispatch('hills/filterHillList', filters)
    },
    isSelected(heightRange) {
      return this.hillList.filters.heightRanges.includes(heightRange)
    },
  },
}
</script>

<style lang="scss" scoped></style>
