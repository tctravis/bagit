<template>
  <div class="grid grid-cols-12 gap-4">
    <!-- <HillListItem
      v-for="nearbyHill in nearbyHills"
      :key="nearbyHill.id"
      :hill="nearbyHill"
      :hills-bagged="hillsBagged"
      :distance="nearbyHill.distance"
    /> -->
    <HillCard
      v-for="nearbyHill in nearbyHills"
      :key="nearbyHill.id"
      :hill="nearbyHill"
      class="col-span-12 sm:col-span-6 lg:col-span-4"
    />
  </div>
</template>

<script>
//import calcDistance from '@/utils/calcDistance.js'
import calculateDistances from '@/mixins/calculateDistances.js'
import { mapState, mapGetters } from 'vuex'
import HillCard from '@/components/hills/HillCard.vue'
// import HillListItem from '@/components/hills/HillListItem.vue'
export default {
  components: {
    HillCard,
  },
  mixins: [calculateDistances],
  props: {
    hill: {
      type: Object,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    ...mapState({
      hillsBagged: (state) => state.users.user.hillsBagged,
    }),
    hills() {
      return this.getHills()
    },
    nearbyHills() {
      // see mixins : calculateDistances: move into state for each hill
      return this.findDistancesFromLoc(this.hill, this.hills, this.limit)
    },
  },
  methods: {
    ...mapGetters('hills', ['getHills']),
  },
}
</script>

<style lang="scss" scoped></style>
