<template>
  <footer class="bg-southern fixed left-0 right-0 bottom-0 py-2">
    <div class="container">
      <div class="flex flex-row justify-end">
        <nuxt-link class="mx-2" to="/user/register">Register</nuxt-link>
        <nuxt-link class="mx-2" to="/user/login">Login</nuxt-link>
        <nuxt-link class="mx-2" to="/user/edit-profile">Edit profile</nuxt-link>
        <a @click="signOut">Log out</a>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      signOut: 'users/signOut',
    }),
  },
}
</script>
