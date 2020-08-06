<template>
  <div class="flex flex-row items-center">
    <span class="mr-2">Height-rating:</span>
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
  },
  methods: {
    iconColor(n) {
      return n <= this.heightRating
        ? theme.colors[this.areaClassName].default
        : '#eeeeee'
    },
  },
}
</script>

<style lang="scss" scoped></style>
