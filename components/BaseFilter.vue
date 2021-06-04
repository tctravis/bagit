<template>
  <div class="w-full md:flex mb-4">
    <div
      class="mb-2 mr-4 min-w-5rem flex items-center justify-between md:items-start md:justify-start"
    >
      <p class="flex-shrink-1" :id="filterName">
        <slot name="label">Label</slot>
      </p>
      <BaseTooltipInfo v-if="info">{{ info }}</BaseTooltipInfo>
    </div>
    <div :aria-labelledby="filterName"><slot name="filters">Filters</slot></div>
  </div>
</template>

<script>
export default {
  props: {
    filterName: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      default: null,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>