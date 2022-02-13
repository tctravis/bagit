<template>
  <BaseFieldGroup
    :label="label"
    :field-id="fieldId"
    :is-required="isRequired"
    :label-above="labelAbove"
  >
    <template v-slot:field>
      <input
        class="border-eastern text-color-body border-2 rounded p-1 flex-grow w-full"
        :value="value"
        v-bind="$attrs"
        v-on="{
          ...$listeners,
          input: (event) => updateValue(event),
        }"
      />
    </template>
  </BaseFieldGroup>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: null,
    },
    label: {
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
  computed: {
    fieldId() {
      return this.$attrs.id
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
