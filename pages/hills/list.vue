<template>
  <div>
    <BasePageTitle>Hills list</BasePageTitle>
    <div class="flex flex-wrap">
      <HillCard
        v-for="hill in hills"
        :key="hill.rank"
        :hill="hill"
        :hills-climbed="user.hillsClimbed"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HillCard from '@/components/HillCard.vue'

export default {
  components: {
    HillCard,
  },
  fetchOnServer: false,
  computed: {
    ...mapState({
      hills: (state) => state.hills.hills,
      currentUser: (state) => state.users.currentUser,
      user: (state) => state.users.user,
    }),
  },
}
</script>
