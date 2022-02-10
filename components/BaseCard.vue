<template>
  <div :class="cardClass">
    <slot name="header" />
    <slot name="body" />
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  props: {
    cardClass: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
