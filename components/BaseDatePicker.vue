<template>
  <BaseFieldGroup :label="label" :field-id="fieldId">
    <template v-slot:field>
      <DatePicker
        :id="fieldId"
        input-class="p-2 border-eastern border-2 rounded"
        wrapper-class="w-full"
        :value="date"
        v-bind="$attrs"
        v-on="$listeners"
        @selected="updateValue"
      />
    </template>
  </BaseFieldGroup>
</template>

<script>
import DatePicker from '@sum.cumo/vue-datepicker'
import '@sum.cumo/vue-datepicker/dist/vuejs-datepicker.css'

export default {
  components: {
    DatePicker,
  },
  inheritAttrs: false,
  props: {
    date: {
      type: Date,
      default: null,
    },
    label: String,
  },
  computed: {
    fieldId() {
      return this.$attrs.id
    },
  },
  methods: {
    updateValue(date) {
      this.$emit('input', date)
    },
  },
}
</script>

<style lang="scss" scoped></style>
