<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <UserCard :user="user" />
    <h2 class="text-2xl">Latest Bags</h2>
    <BaggedList :bags="user.bags" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserCard from '@/components/UserCard.vue'
import BaggedList from '@/components/BaggedList.vue'
export default {
  components: {
    UserCard,
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
