<template>
  <div class="flex flex-col items-center py-12">
    <BaseTitle :is-display-font="true"><slot name="title" /></BaseTitle>
    <p><slot name="strapline" /></p>
    <div><slot name="actions" /></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
