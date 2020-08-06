<template>
  <div>
    <BasePageTitle><template v-slot:title>Log in</template></BasePageTitle>
    <form @submit.prevent="login">
      <BaseInput id="user-email" v-model="email" label="Email:" type="text" />
      <BaseInput
        id="user-password"
        v-model="password"
        label="Password:"
        type="password"
      />
      <BaseButton type="submit" button-class="bg-northwestern"
        >Log In</BaseButton
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('users/login', {
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
