<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <UserCard :user="user" />
    <h3>Your progress</h3>
    <h3>Latest bags</h3>
    <h3>Wishlist</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserCard from '@/components/UserCard.vue'
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
