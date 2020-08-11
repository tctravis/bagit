<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <OverallProgressChart :bags="user.bags" class="mb-6" />
    <h2 class="text-2xl mb-2">Your Latest Bags</h2>
    <BaggedList :bags="user.bags" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaggedList from '@/components/user/BaggedList.vue'
import OverallProgressChart from '@/components/user/OverallProgressChart.vue'
export default {
  components: {
    BaggedList,
    OverallProgressChart,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUser: (state) => state.users.currentUser,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
