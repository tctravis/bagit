<template>
  <div class="flex flex-row justify-between items-start mb-2">
    <h1 class="text-2xl decorated-header">
      <slot name="title">Page title</slot>
    </h1>
    <slot name="icon"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
