<template>
  <div class="flex flex-row items-center">
    <span>
      <slot></slot>
    </span>
    <font-awesome-icon
      v-for="n in 5"
      :key="n"
      :style="{ color: iconColor(n) }"
      :icon="['fa', 'mountain']"
    />
    <span v-if="height && showHeight" class="ml-2">({{ height }}m)</span>
  </div>
</template>

<script>
import { theme } from '~tailwind.config'
export default {
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
    enabledIconColor() {
      return this.hasBagged
        ? theme.colors.grey.DEFAULT
        : theme.colors[this.areaClassName].DEFAULT
    },
  },
  methods: {
    iconColor(n) {
      return n <= this.heightRating
        ? this.enabledIconColor
        : theme.colors.grey.dark
    },
  },
}
</script>

<style lang="scss" scoped></style>
