<template>
  <div>
    <BasePageTitle>Dashboard</BasePageTitle>
    <UserCard :user="user" />
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
