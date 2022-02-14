<template>
  <section class="flow rounded p-2 md:p-4 bg-grey-light text-color-body">
    <div class="flex flex-row items-center justify-between">
      <BaseTitle :level="2" :header-font-size="2" :has-decoration="true"
        ><slot name="title"
      /></BaseTitle>
      <slot name="tooltip" />
    </div>
    <slot name="chart" />
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
