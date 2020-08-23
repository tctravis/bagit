<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Edit profile</template></BasePageTitle
    >
    <div class="sm:w-3/5">
      <p class="text-error mb-4">* required</p>

      <h3 class="text-xl">Profile details</h3>
      <div class="form-section">
        <form @submit.prevent="updateProfile">
          <BaseInput
            id="userName"
            v-model="user.userName"
            label="Username"
            type="text"
            :isRequired="true"
          />
          <div class="flex flex-row justify-end">
            <BaseButton type="submit" button-class="bg-southern text-white"
              ><slot>Update Profile</slot></BaseButton
            >
          </div>
        </form>
      </div>
      <h3 class="text-xl">Update login details</h3>
      <div class="form-section">
        <form @submit.prevent="updateEmail">
          <BaseInput
            id="email"
            v-model="user.email"
            label="Email"
            type="email"
            :isRequired="true"
          />
          <div class="flex flex-row justify-end items-center">
            <BaseButton type="submit" button-class="bg-southern text-white"
              ><slot>Update email</slot></BaseButton
            >
          </div>
        </form>
      </div>
      <div class="form-section text-right">
        <nuxt-link to="/user/password-reset">Reset password</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUser: (state) => state.users.currentUser,
    }),
  },
  methods: {
    updateProfile(user) {
      this.$store.dispatch('users/updateProfile', {
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
      })
    },
  },
}
</script>

<style lang="scss" scoped />
