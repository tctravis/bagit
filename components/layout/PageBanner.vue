<template>
  <!-- <div
    class="h-32 sm:h-40 md:h-56 lg:h-64 flex items-end bg-cover"
    :style="'background-image: url(' + imgUrl + ')'"
  > -->
  <div class="bg-southern h-24 md:h-32 flex items-center bg-cover">
    <div class="container py-4">
      <h1 class="uppercase text-4xl md:text-5xl lg:text-6xl text-white">
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
  },
}
</script>

<style lang="scss" scoped>
</style>