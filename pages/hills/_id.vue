<template>
  <div>
    <BasePageTitle>{{ hill.name }}</BasePageTitle>
    <HillCard :hill="hill" :hills-climbed="user.hillsClimbed" />
    <h2 class="text-xl">Nearby Wainwrights</h2>
    <h2 class="text-xl">Routes</h2>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HillCard from '@/components/HillCard.vue'

export default {
  components: {
    HillCard,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
    ...mapGetters('hills', ['getHillById']),
    hill() {
      return this.getHillById(this.hillId)
    },
    hillId() {
      return this.$route.params.id
    },
  },
  head() {
    return {
      title: 'Hill #' + this.hill.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Details about hill' + this.hill.id,
        },
      ],
    }
  },
}
</script>
