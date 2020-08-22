<template>
  <label class="w-full block" :for="fieldId"><slot>Field label: </slot></label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    fieldId: String,
  },
}
</script>
