<template>
  <div class="w-full xsm:flex items-center mb-4">
    <label v-if="label" :for="fieldId" class="xsm:w-40">{{ label }}</label>
    <slot name="field" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    fieldId: String,
  },
}
</script>

<style lang="scss" scoped></style>
