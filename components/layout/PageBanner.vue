<template>
  <!-- <div
    class="h-32 sm:h-40 md:h-56 lg:h-64 flex items-end bg-cover"
    :style="'background-image: url(' + imgUrl + ')'"
  > -->
  <div :class="'bg-theme-' + theme" class="flex items-center bg-cover">
    <div class="container py-4 flex items-center justify-between">
      <h1 class="uppercase text-2xl md:text-3xl lg:text-4xl font-bold">
        <slot>Page title</slot>
      </h1>
      <div class="flex-shrink-0 ml-4" v-if="hillId">
        <BagItButton :hill-id="hillId" :theme="theme" />
      </div>
    </div>
  </div>
</template>

<script>
import BagItButton from '@/components/user/BagItButton.vue'
export default {
  components: {
    BagItButton,
  },
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

<style lang="scss" scoped>
</style>