<template>
  <div
    class="md:hidden flex flex-row justify-end items-center cursor-pointer"
    v-on="$listeners"
  >
    Close
    <font-awesome-icon :icon="['fa', 'times']" :class="'ml-2 text-xl'" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
