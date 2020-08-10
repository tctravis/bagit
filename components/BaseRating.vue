<template>
  <div class="flex flex-row items-center h-6">
    <p class="sr-only">Your rating: {{ rating }} out of {{ ratingOutOf }}</p>
    <p>
      <font-awesome-icon
        v-for="n in ratingOutOf"
        :key="n"
        :style="{ color: iconColor(n) }"
        :icon="['fa', 'star']"
      />
    </p>
  </div>
</template>

<script>
import { theme } from '~tailwind.config'
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
    ratingOutOf: {
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
      return n <= this.rating
        ? theme.colors[this.areaClassName].default
        : theme.colors.grey.default
    },
  },
}
</script>

<style lang="scss" scoped></style>
