<template>
  <div class="w-full items-center py-2">
    <label v-if="label" :for="fieldId" class="w-full block"
      >{{ label
      }}<span v-if="isRequired" class="text-error ml-1">*</span></label
    >
    <slot name="field" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    fieldId: String,
    isRequired: Boolean,
  },
}
</script>

<style lang="scss" scoped></style>
