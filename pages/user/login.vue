<template>
  <div>
    <form @submit.prevent="login">
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
        Log-in
      </button>
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
