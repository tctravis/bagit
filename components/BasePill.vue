<template>
  <button
    class="inline-flex flex-row flex-shrink-0 items-center justify-between mb-2 mr-2 py-1 px-4 rounded-full font-bold"
    :class="isActive ? 'pr-1' : ''"
    v-on="$listeners"
  >
    <slot>Pill</slot>
    <span
      v-if="isActive"
      class="ml-2 rounded-full h-6 w-6 flex items-center justify-center bg-white text-color-body text-center"
      ><font-awesome-icon :icon="['fa', 'times']" class="text-color-body"
    /></span>
  </button>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
}
</script>

<style lang="scss" scoped></style>
