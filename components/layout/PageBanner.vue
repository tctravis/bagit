<template>
  <div
    class="h-32 sm:h-40 md:h-56 lg:h-64 flex items-end bg-cover"
    :style="'background-image: url(' + imgUrl + ')'"
  >
    <div class="container py-4">
      <h1 class="text-4xl md:text-5xl lg:text-6xl text-white">
        <slot>Page title</slot>
      </h1>
      <p class="text-white uppercase">The fun way to collect Wainwrights</p>
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