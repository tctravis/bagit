<template>
  <BasePill
    v-if="this.$geolocation.supported"
    class="bg-lightgrey mr-2"
    @click="$emit('sort-by-vicinity')"
    >Near me</BasePill
  >
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>