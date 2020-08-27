<template>
  <div
    class="rounded p-2 bg-lightgrey mb-2 flex flex-row justify-between items-center"
  >
    <div><slot>Info here</slot></div>
    <slot name="icon"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
