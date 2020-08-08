<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <h2 class="text-2xl">Your Bags</h2>
    <BaggedList :bags="hillsBagged" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaggedList from '@/components/BaggedList.vue'
export default {
  components: {
    BaggedList,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUser: (state) => state.users.currentUser,
    }),
    hillsBagged() {
      let hillsBagged = this.user.bags
      hillsBagged.sort(function (a, b) {
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        return 0
      })
      return hillsBagged
    },
  },
}
</script>

<style lang="scss" scoped></style>
