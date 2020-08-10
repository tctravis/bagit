<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <OverallProgressChart :bags="user.bags" class="mb-6" />
    <h2 class="text-2xl mb-2">Your Latest Bags</h2>
    <BaggedList :bags="hillsBaggedDesc" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaggedList from '@/components/BaggedList.vue'
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
    hillsBaggedDesc() {
      let hillsBaggedDesc = this.user.bags
      hillsBaggedDesc.sort(function (a, b) {
        if (a.date < b.date) return -1
        if (a.date > b.date) return 1
      })
      return hillsBaggedDesc
    },
  },
}
</script>

<style lang="scss" scoped></style>
