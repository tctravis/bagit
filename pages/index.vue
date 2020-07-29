<template>
  <div>
    <BasePageTitle>Log in</BasePageTitle>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('users/get')
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
