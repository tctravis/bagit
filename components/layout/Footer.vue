<template>
  <footer
    class="bg-southern text-white fixed left-0 right-0 bottom-0 flex flex-row items-center justify-end z-1"
  >
    <nuxt-link v-if="currentUserId === ''" class="p-4" to="/user/register"
      >Register</nuxt-link
    >
    <nuxt-link v-if="currentUserId === ''" class="p-4" to="/user/login"
      >Login</nuxt-link
    >
    <a v-if="currentUserId !== ''" class="p-4 cursor-pointer" @click="signOut"
      >Log out</a
    >
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
    }),
  },
  methods: {
    ...mapActions({
      signOut: 'users/signOut',
    }),
  },
}
</script>
