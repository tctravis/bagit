<template>
  <div>
    <Badge
      :icon-class="hasBagged([1, 10]) ? 'text-southern' : 'text-grey'"
      :label-class="hasBagged([1, 10]) ? 'text-darkgrey' : 'text-grey'"
      :badge-icon="['fa', 'ribbon']"
      >10 highest fells bagged</Badge
    >
    <Badge
      :icon-class="mostBagsInADay >= 5 ? 'text-southern' : 'text-grey'"
      :label-class="mostBagsInADay >= 5 ? 'text-darkgrey' : 'text-grey'"
      :badge-icon="['fa', 'ribbon']"
      >5 bags in a day</Badge
    >
    <Badge
      :icon-class="mostBagsInADay >= 10 ? 'text-southern' : 'text-grey'"
      :label-class="mostBagsInADay >= 10 ? 'text-darkgrey' : 'text-grey'"
      :badge-icon="['fa', 'ribbon']"
      >10 bags in a day</Badge
    >
    <Badge
      :icon-class="bagsInEachArea ? 'text-southern' : 'text-grey'"
      :label-class="bagsInEachArea ? 'text-darkgrey' : 'text-grey'"
      :badge-icon="['fa', 'ribbon']"
      >At least 1 bag in each area</Badge
    >
  </div>
</template>

<script>
import calcMode from '@/utils/calcMode.js'
import { mapGetters, mapState } from 'vuex'
import Badge from '@/components/widgets/Badge.vue'

export default {
  components: {
    Badge,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('hills', ['getHills', 'getTotalHills', 'getAreas']),
    ...mapState({
      userBags: (state) => state.users.user.bags,
      hillsBagged: (state) => state.users.user.hillsBagged,
    }),
    bagsInEachArea() {
      let bagsInEachArea = false
      const areas = this.getAreas.map((area) => area.id)
      const areasBagged = this.userBags.map((bag) => bag.area)
      const uniqueAreasBagged = [...new Set(areasBagged)]

      bagsInEachArea = areas.every((area) => uniqueAreasBagged.includes(area))
      return bagsInEachArea
    },
    bagDates() {
      return this.userBags.map((bag) => bag.date)
    },
    dateOfMostBags() {
      return calcMode(this.bagDates)
    },
    mostBagsInADay() {
      let date = this.dateOfMostBags
      let bagsInADay = this.userBags.filter(function (bag) {
        return bag.date.getTime() === date.getTime()
      })
      return bagsInADay.length
    },
  },
  methods: {
    hasBagged(range) {
      let i
      for (i = range[0]; i <= range[1]; i++) {
        if (!this.hillsBagged.includes(i)) return false
      }
      return true
    },
  },
}
</script>

<style lang="scss" scoped></style>
