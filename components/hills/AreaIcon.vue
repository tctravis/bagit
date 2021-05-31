<template>
  <div
    :class="('bg-theme-' + hill.areaName) | removeSpaces | lowercase"
    class="rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
  >
    <span>{{ hill.area }}</span>
  </div>
</template>

<script>
export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
