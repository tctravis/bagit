<template>
  <div>
    <BasePageTitle><template v-slot:title>Register</template></BasePageTitle>
    <form @submit.prevent="register">
      <BaseInput
        id="firstName"
        v-model="firstName"
        label="First Name:"
        type="text"
      />
      <BaseInput
        id="secondName"
        v-model="secondName"
        label="Second Name:"
        type="text"
      />
      <BaseInput id="email" v-model="email" label="Email:" type="email" />
      <BaseInput
        id="password"
        v-model="password"
        label="Password:"
        type="password"
      />
      <BaseButton type="submit" button-class="bg-northwestern"
        >Register</BaseButton
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    register() {
      this.$store.dispatch('users/register', {
        firstName: this.firstName,
        secondName: this.secondName,
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
