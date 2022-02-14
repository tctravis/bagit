<template>
  <div class="mb-4">
    <WidgetsBadgeRack>
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 10 ? 'text-southern' : 'text-grey'"
        :label-class="totalBags >= 10 ? 'text-color-body' : 'text-grey'"
        icon-text="10"
        >10 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 20 ? 'text-eastern' : 'text-grey'"
        :label-class="totalBags >= 20 ? 'text-color-body' : 'text-grey'"
        icon-text="20"
        >20 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 50 ? 'text-northern' : 'text-grey'"
        :label-class="totalBags >= 50 ? 'text-color-body' : 'text-grey'"
        icon-text="50"
        >50 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 100 ? 'text-northwestern' : 'text-grey'"
        :label-class="totalBags >= 100 ? 'text-color-body' : 'text-grey'"
        icon-text="100"
        >100 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 150 ? 'text-western' : 'text-grey'"
        :label-class="totalBags >= 150 ? 'text-color-body' : 'text-grey'"
        icon-text="150"
        >150 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 200 ? 'text-fareastern' : 'text-grey'"
        :label-class="totalBags >= 200 ? 'text-color-body' : 'text-grey'"
        icon-text="200"
        >200 bags</WidgetsBadge
      >
    </WidgetsBadgeRack>
    <div
      class="rounded px-2 pt-2"
      :class="totalBags === totalHills ? 'bg-central' : 'bg-lightgrey'"
    >
      <WidgetsBadge
        class="justify-center"
        :icon-class="totalBags === totalHills ? 'text-white' : 'text-grey'"
        :label-class="
          totalBags === totalHills ? 'text-white text-lg' : 'text-grey text-lg'
        "
        :badge-icon="['fa', 'trophy']"
        >Bagged 'em all!</WidgetsBadge
      >
    </div>
    <BaseTitle :level="3">Challenges</BaseTitle>
    <div>
      <WidgetsBadge
        :icon-class="hasBagged([1, 10]) ? 'text-southern' : 'text-grey'"
        :label-class="hasBagged([1, 10]) ? 'text-color-body' : 'text-grey'"
        :badge-icon="['fa', 'ribbon']"
        >10 highest fells bagged</WidgetsBadge
      >
      <WidgetsBadge
        :icon-class="mostBagsInADay >= 5 ? 'text-southern' : 'text-grey'"
        :label-class="mostBagsInADay >= 5 ? 'text-color-body' : 'text-grey'"
        :badge-icon="['fa', 'ribbon']"
        >5 bags in a day</WidgetsBadge
      >
      <WidgetsBadge
        :icon-class="mostBagsInADay >= 10 ? 'text-southern' : 'text-grey'"
        :label-class="mostBagsInADay >= 10 ? 'text-color-body' : 'text-grey'"
        :badge-icon="['fa', 'ribbon']"
        >10 bags in a day</WidgetsBadge
      >
      <WidgetsBadge
        :icon-class="bagsInEachArea ? 'text-southern' : 'text-grey'"
        :label-class="bagsInEachArea ? 'text-color-body' : 'text-grey'"
        :badge-icon="['fa', 'ribbon']"
        >At least 1 bag in each area</WidgetsBadge
      >
    </div>
  </div>
</template>

<script>
import calcMode from '@/utils/calcMode.js'
import { mapGetters, mapState } from 'vuex'

export default {
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
