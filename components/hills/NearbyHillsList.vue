<template>
  <div>
    <HillListItem
      v-for="nearbyHill in nearbyHills"
      :key="nearbyHill.id"
      :hill="nearbyHill"
      :hills-bagged="hillsBagged"
      :distance="nearbyHill.distance"
    />
  </div>
</template>

<script>
//import calcDistance from '@/utils/calcDistance.js'
import calculateDistances from '@/mixins/calculateDistances.js'
import { mapState, mapGetters } from 'vuex'
import HillListItem from '@/components/hills/HillListItem.vue'
export default {
  components: {
    HillListItem,
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
