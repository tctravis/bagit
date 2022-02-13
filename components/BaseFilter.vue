<template>
  <div class="w-full">
    <div v-if="showFilterName" class="mb-2 flex items-center justify-between">
      <p :id="filterName">
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
    showFilterName: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
