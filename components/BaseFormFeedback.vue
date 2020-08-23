<template>
  <div class="p-2 mb-4 rounded" :class="messageClass">
    <p>
      <slot>Form message</slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
  computed: {
    messageClass() {
      return 'bg-' + this.type
    },
  },
}
</script>

<style lang="scss" scoped></style>
