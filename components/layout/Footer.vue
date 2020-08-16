<template>
  <footer
    class="z-50 bg-southern text-white fixed left-0 right-0 bottom-0 h-12 flex flex-row items-center"
  >
    <div class="container px-4">
      <div class="flex flex-row justify-end">
        <nuxt-link v-if="currentUserId === ''" class="mx-2" to="/user/register"
          >Register</nuxt-link
        >
        <nuxt-link v-if="currentUserId === ''" class="mx-2" to="/user/login"
          >Login</nuxt-link
        >
        <nuxt-link
          v-if="currentUserId !== ''"
          class="mx-2"
          to="/user/edit-profile"
          >Edit profile</nuxt-link
        >
        <a v-if="currentUserId !== ''" class="cursor-pointer" @click="signOut"
          >Log out</a
        >
      </div>
    </div>
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
