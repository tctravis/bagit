<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred: {{ error.statusCode }}</h1>
    <p>{{ message }}</p>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.errorStatusCode) || 500
    },
    message() {
      return this.error.message
    },
  },
  head() {
    return {
      title: this.message,
    }
  },
}
</script>
