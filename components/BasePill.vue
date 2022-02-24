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
      ><CloseIcon class="h-4 stroke-grey-darkest"
    /></span>
  </button>
</template>

<script>
import CloseIcon from '~/assets/icons/cross.svg?inline'
export default {
  components: {
    CloseIcon,
  },
  props: {
    isActive: Boolean,
  },
}
</script>

<style lang="scss" scoped></style>
