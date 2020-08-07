<template>
  <BaseFieldGroup :label="label" :field-id="fieldId" class="items-start">
    <template v-slot:field>
      <textarea
        class="w-full border-eastern border-2 rounded p-2"
        :value="value"
        v-bind="$attrs"
        @input="updateValue"
      />
    </template>
  </BaseFieldGroup>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: String,
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
