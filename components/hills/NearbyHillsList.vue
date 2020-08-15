<template>
  <div>
    <h3>Nearby Hills</h3>
    <HillListItem
      v-for="nearbyHill in nearbyHills"
      :key="nearbyHill.hill.id"
      :hill="nearbyHill.hill"
      :hills-bagged="hillsBagged"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HillListItem from '@/components/hills/HillListItem.vue'
export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
    limit: {
      type: Number,
      default: 5,
    },
  },
  components: {
    HillListItem,
  },
  computed: {
    ...mapState({
      hillsBagged: (state) => state.users.user.hillsBagged,
    }),
    hills() {
      return this.getHills()
    },
    nearbyHills() {
      return this.findDistancesFromHill(this.hill, this.limit)
    },
  },
  methods: {
    // return an array of x nearest hills to this one
    findDistancesFromHill(hill, limit) {
      let distancesFromHill = []
      let originLoc = { lat: hill.lat, lon: hill.lng }
      this.hills.forEach((hill) => {
        let loc = {
          lat: hill.lat,
          lon: hill.lng,
        }
        let distanceFromOrigin = this.calculateDistance(originLoc, loc)
        let nearbyHills = {
          distance: distanceFromOrigin,
          hill: hill,
        }
        distancesFromHill.push(nearbyHills)
      })
      //sort by closest to this hill
      distancesFromHill.sort(function (a, b) {
        return a.distance - b.distance
      })
      return distancesFromHill.slice(1, limit + 1)
    },
    calculateDistance(loc1, loc2) {
      const R = 6371e3 // metres
      const φ1 = (loc1.lat * Math.PI) / 180 // φ, λ in radians
      const φ2 = (loc2.lat * Math.PI) / 180
      const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180
      const Δλ = ((loc2.lon - loc1.lon) * Math.PI) / 180

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      const d = R * c // in metres
      return Math.round(d)
    },
    ...mapGetters('hills', ['getHills']),
  },
}
</script>

<style lang="scss" scoped></style>
