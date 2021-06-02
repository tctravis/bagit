<template>
  <!-- <div
    class="h-32 sm:h-40 md:h-56 lg:h-64 flex items-end bg-cover"
    :style="'background-image: url(' + imgUrl + ')'"
  > -->
  <div :class="'bg-theme-' + theme" class="flex items-center bg-cover">
    <div class="container py-4">
      <h1 class="uppercase text-2xl md:text-3xl lg:text-4xl font-bold">
        <slot>Page title</slot>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: 'primary',
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>