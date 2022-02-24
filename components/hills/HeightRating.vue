<template>
  <div class="flex flex-row items-center">
    <span>
      <slot></slot>
    </span>
    <IconMountain v-for="n in 5" :key="n" class="h-4" :class="iconClass(n)" />
    <span v-if="height && showHeight" class="ml-2">({{ height }}m)</span>
  </div>
</template>

<script>
import IconMountain from '~/assets/icons/mountain.svg?inline'

export default {
  components: {
    IconMountain,
  },
  props: {
    heightRating: {
      type: String,
      required: true,
    },
    areaClassName: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: '0',
    },
    showHeight: {
      type: Boolean,
      default: true,
    },
    hasBagged: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    iconColor() {
      return this.hasBagged ? 'fill-grey-light' : `fill-${this.areaClassName}`
    },
  },
  methods: {
    iconClass(n) {
      return n <= this.heightRating ? this.iconColor : `fill-grey`
    },
  },
}
</script>

<style lang="scss" scoped></style>
