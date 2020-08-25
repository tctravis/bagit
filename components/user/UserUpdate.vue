<template>
  <div class="sm:w-3/5">
    <form @submit.prevent="userUpdate">
      <p class="text-error mb-4">* required</p>
      <BaseInput
        id="firstName"
        v-model="user.userName"
        label="Username"
        type="text"
        :is-required="true"
      />
      <BaseInput
        id="email"
        v-model="user.email"
        label="Email"
        type="email"
        :is-required="true"
      />
      <BaseInput
        id="password"
        v-model="user.password"
        label="Password"
        type="password"
        :is-required="true"
      />
      <div class="flex flex-row justify-end pt-4">
        <BaseButton type="submit" button-class="bg-southern text-white"
          ><slot>Update User</slot></BaseButton
        >
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('users', ['getUser']),
    enablePasswordField() {
      return false
    },
    user() {
      let user = Object.assign({}, this.getUser)
      return user
    },
  },
  methods: {
    userUpdate() {
      this.$emit('user-update', this.user)
    },
  },
}
</script>

<style lang="scss" scoped></style>
