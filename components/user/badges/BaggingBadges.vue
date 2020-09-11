<template>
  <div class="mb-4">
    <BadgeRack>
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 10 ? 'text-southern' : 'text-grey'"
        :label-class="totalBags >= 10 ? 'text-darkgrey' : 'text-grey'"
        icon-text="10"
        >10 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 20 ? 'text-eastern' : 'text-grey'"
        :label-class="totalBags >= 20 ? 'text-darkgrey' : 'text-grey'"
        icon-text="20"
        >20 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 50 ? 'text-northern' : 'text-grey'"
        :label-class="totalBags >= 50 ? 'text-darkgrey' : 'text-grey'"
        icon-text="50"
        >50 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 100 ? 'text-northwestern' : 'text-grey'"
        :label-class="totalBags >= 100 ? 'text-darkgrey' : 'text-grey'"
        icon-text="100"
        >100 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 150 ? 'text-western' : 'text-grey'"
        :label-class="totalBags >= 150 ? 'text-darkgrey' : 'text-grey'"
        icon-text="150"
        >150 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 200 ? 'text-fareastern' : 'text-grey'"
        :label-class="totalBags >= 200 ? 'text-darkgrey' : 'text-grey'"
        icon-text="200"
        >200 bags</Badge
      >
    </BadgeRack>
    <div
      class="rounded px-2 pt-2"
      :class="totalBags === totalHills ? 'bg-central' : 'bg-lightgrey'"
    >
      <Badge
        class="justify-center"
        :icon-class="totalBags === totalHills ? 'text-white' : 'text-grey'"
        :label-class="
          totalBags === totalHills ? 'text-white text-lg' : 'text-grey text-lg'
        "
        :badge-icon="['fa', 'trophy']"
        >Bagged 'em all!</Badge
      >
    </div>
    <BaseTitle :level="3">Challenges</BaseTitle>
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
  </div>
</template>

<script>
import calcMode from '@/utils/calcMode.js'
import { mapGetters, mapState } from 'vuex'
import BadgeRack from '@/components/widgets/BadgeRack.vue'
import Badge from '@/components/widgets/Badge.vue'

export default {
  components: {
    Badge,
    BadgeRack,
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
    totalBags() {
      return this.userBags.length
    },
    totalHills() {
      return this.getTotalHills
    },
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
