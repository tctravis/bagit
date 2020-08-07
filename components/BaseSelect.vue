<template>
  <BaseFieldGroup :label="label" :field-id="fieldId">
    <template v-slot:field>
      <select
        :value="value"
        v-bind="$attrs"
        class="w-full border-2 border-eastern p-2 rounded"
        @change="updateValue"
      >
        <option
          v-for="option in options"
          :key="option"
          :selected="option === value"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </template>
  </BaseFieldGroup>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    selectClass: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
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
