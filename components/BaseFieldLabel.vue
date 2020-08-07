<template>
  <label class="mr-2" :for="fieldId"><slot>Field label: </slot></label>
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
