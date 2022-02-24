<template>
  <!-- <div
    class="h-32 sm:h-40 md:h-56 lg:h-64 flex items-end bg-cover"
    :style="'background-image: url(' + imgUrl + ')'"
  > -->
  <div :class="'bg-theme-' + theme" class="flex items-center bg-cover">
    <div class="container py-4 flex items-center justify-between">
      <h1
        class="uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-color-body"
      >
        <slot>Page title</slot>
      </h1>
      <div v-if="hillId" class="flex-shrink-0 ml-4">
        <UserBagItButton :hill-id="hillId" :theme="theme" />
      </div>
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
    },
    // hillId: {
    //   type: Number,
    //   required: false,
    // },
  },
  computed: {
    hillId() {
      let hillId = null
      if (this.$route.name === 'hills-id' && 'id' in this.$route.params) {
        hillId = this.$route.params.id
      }
      return JSON.parse(hillId)
    },
  },
}
</script>

<style lang="scss" scoped></style>
