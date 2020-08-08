<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <h2 class="text-2xl">Your Bags</h2>
    <BaggedList :bags="user.bags" />
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
  },
}
</script>

<style lang="scss" scoped></style>
