<template>
  <div
    class="md:hidden flex flex-row justify-end items-center cursor-pointer p-4"
    v-on="$listeners"
  >
    Close
    <CloseIcon class="stroke-eastern h-6 ml-4" />
  </div>
</template>

<script>
import CloseIcon from '~/assets/icons/cross.svg?inline'
export default {
  components: {
    CloseIcon,
  },
}
</script>

<style lang="scss" scoped></style>
