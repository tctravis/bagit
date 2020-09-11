<template>
  <div
    class="h-32 sm:h-40 lg:h-56 flex items-end bg-cover"
    :style="'margin-top: 56px; background-image: url(' + imgUrl + ')'"
  >
    <div class="container p-4">
      <h1 class="text-4xl md:text-5xl lg:text-6xl text-white">
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