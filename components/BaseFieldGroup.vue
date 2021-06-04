<template>
  <div class="w-full sm:flex items-center py-2">
    <label
      v-if="label"
      :for="fieldId"
      class="block flex-shrink-0 mb-2 sm:mb-0 sm:mr-2"
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
