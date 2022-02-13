<template>
  <div class="flex flex-row justify-between items-start py-4 w-full container">
    <h1 class="text-3xl text-white decorated-header">
      <slot name="title">Page title</slot>
    </h1>
    <slot name="icon"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
