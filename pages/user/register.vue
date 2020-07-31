<template>
  <div>
    <form @submit.prevent="register">
      <label for="firstName">
        First Name:
      </label>
      <input
        v-model="firstName"
        class="w-full border"
        type="text"
        name="firstName"
        value
      />

      <label for="secondName">
        Second Name:
      </label>
      <input
        v-model="secondName"
        class="w-full border"
        type="text"
        name="secondName"
        value
      />

      <label for="email">
        Email:
      </label>
      <input
        v-model="email"
        class="w-full border"
        type="email"
        name="email"
        value
      />

      <label for="password">
        Password:
      </label>
      <input
        v-model="password"
        class="w-full border"
        type="password"
        name
        value
      />

      <button type="submit" name="button" class="bg-southern my-2">
        Register
      </button>
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
