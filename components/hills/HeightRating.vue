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
  </div>
</template>

<script>
import { theme } from '~tailwind.config'
export default {
  props: {
    heightRating: {
      type: Number,
      required: true,
    },
    areaClassName: {
      type: String,
      required: true,
    },
    hasBagged: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    enabledIconColor() {
      return this.hasBagged ? 'darkgrey' : this.areaClassName
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
