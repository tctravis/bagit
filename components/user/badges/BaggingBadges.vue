<template>
  <div class="mb-4">
    <BadgeRack>
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 10 ? 'text-southern' : 'text-grey'"
        :labelClass="totalBags >= 10 ? 'text-darkgrey' : 'text-grey'"
        iconText="10"
        >10 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 20 ? 'text-eastern' : 'text-grey'"
        :labelClass="totalBags >= 20 ? 'text-darkgrey' : 'text-grey'"
        iconText="20"
        >20 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 50 ? 'text-northern' : 'text-grey'"
        :labelClass="totalBags >= 50 ? 'text-darkgrey' : 'text-grey'"
        iconText="50"
        >50 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 100 ? 'text-northwestern' : 'text-grey'"
        :labelClass="totalBags >= 100 ? 'text-darkgrey' : 'text-grey'"
        iconText="100"
        >100 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 150 ? 'text-western' : 'text-grey'"
        :labelClass="totalBags >= 150 ? 'text-darkgrey' : 'text-grey'"
        iconText="150"
        >150 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 200 ? 'text-fareastern' : 'text-grey'"
        :labelClass="totalBags >= 200 ? 'text-darkgrey' : 'text-grey'"
        iconText="200"
        >200 bags</Badge
      >
    </BadgeRack>
    <div
      class="rounded px-2 pt-2"
      :class="totalBags === totalHills ? 'bg-central' : 'bg-lightgrey'"
    >
      <Badge
        class="justify-center"
        :iconClass="totalBags === totalHills ? 'text-white' : 'text-grey'"
        :labelClass="
          totalBags === totalHills ? 'text-white text-lg' : 'text-grey text-lg'
        "
        :badgeIcon="['fa', 'trophy']"
        >Bagged 'em all!</Badge
      >
    </div>
    <BaseTitle :level="3">Challenges</BaseTitle>
    <div>
      <Badge
        :iconClass="hasBagged([1, 10]) ? 'text-southern' : 'text-grey'"
        :labelClass="hasBagged([1, 10]) ? 'text-darkgrey' : 'text-grey'"
        :badgeIcon="['fa', 'ribbon']"
        >10 highest fells bagged</Badge
      >
      <Badge
        :iconClass="mostBagsInADay >= 5 ? 'text-southern' : 'text-grey'"
        :labelClass="mostBagsInADay >= 5 ? 'text-darkgrey' : 'text-grey'"
        :badgeIcon="['fa', 'ribbon']"
        >5 bags in a day</Badge
      >
      <Badge
        :iconClass="mostBagsInADay >= 10 ? 'text-southern' : 'text-grey'"
        :labelClass="mostBagsInADay >= 10 ? 'text-darkgrey' : 'text-grey'"
        :badgeIcon="['fa', 'ribbon']"
        >10 bags in a day</Badge
      >
      <Badge
        :iconClass="bagsInEachArea ? 'text-southern' : 'text-grey'"
        :labelClass="bagsInEachArea ? 'text-darkgrey' : 'text-grey'"
        :badgeIcon="['fa', 'ribbon']"
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
