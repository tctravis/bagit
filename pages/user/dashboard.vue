<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <p>Total altitude climbed: {{ getTotalAltClimbed }}m</p>
    <ChartOverallProgress
      v-if="user.bags.length > 0"
      :bags="user.bags"
      class="mb-6"
    />
    <ChartAltitudeLine
      v-if="user.bags.length > 0"
      :bags="user.bags"
      class="mb-6"
    />
    <h2 class="text-2xl mb-2">Your Latest Bags</h2>
    <BaggedList />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaggedList from '@/components/user/BaggedList.vue'
import ChartOverallProgress from '@/components/user/ChartOverallProgress.vue'
import ChartAltitudeLine from '@/components/user/ChartAltitudeLine.vue'
export default {
  components: {
    BaggedList,
    ChartOverallProgress,
    ChartAltitudeLine,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUser: (state) => state.users.currentUser,
    }),
    ...mapGetters('users', ['getTotalAltClimbed', 'sortedBagsDesc']),
  },
}
</script>

<style lang="scss" scoped></style>
