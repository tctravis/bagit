<template>
  <div
    v-on="$listeners"
    class="inline-flex flex-row items-center justify-between py-1 px-4 rounded-full"
    :class="isActive ? 'pr-1' : ''"
  >
    <slot>Pill</slot>
    <span
      v-if="isActive"
      class="ml-2 rounded-full h-6 w-6 flex items-center justify-center bg-white text-darkgrey text-center"
      ><font-awesome-icon :icon="['fa', 'times']" class="text-darkgrey"
    /></span>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
}
</script>

<style lang="scss" scoped></style>
