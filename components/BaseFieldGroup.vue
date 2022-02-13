<template>
  <div class="w-full items-center py-2" :class="labelAbove ? '' : 'flex'">
    <label
      v-if="label"
      :for="fieldId"
      class="flex-shrink-0"
      :class="labelAbove ? 'block mb-2' : 'mr-2'"
      >{{ label
      }}<span v-if="isRequired" class="text-error ml-1">*</span></label
    >
    <slot name="field" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    fieldId: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    labelAbove: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
