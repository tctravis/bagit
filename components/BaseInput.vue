<template>
  <div class="w-full flex items-center mb-4">
    <label v-if="label" class="mr-2" :for="inputId">{{ label }}</label>
    <input
      class="border-eastern border-2 rounded p-1 flex-grow"
      :value="value"
      v-bind="$attrs"
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: String,
  },
  computed: {
    inputId() {
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
