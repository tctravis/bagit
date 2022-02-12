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
      return this.hasBagged ? 'midgrey' : this.areaClassName
    },
  },
  methods: {
    iconColor(n) {
      return n <= this.heightRating
        ? theme.colors[this.enabledIconColor].default
        : theme.colors.grey.default
    },
  },
}
</script>

<style lang="scss" scoped></style>
