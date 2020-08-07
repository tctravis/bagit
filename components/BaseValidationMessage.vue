<template>
  <div class="w-full mb-4">
    <p class="text-fareastern">
      <slot>Validation message</slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    messageType: String,
  },
}
</script>

<style lang="scss" scoped></style>
