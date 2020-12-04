<template>
  <div :class="'card-' + theme" class="rounded p-2">
    <BaseTitle :level="2" :has-decoration="false">
      <slot name="header" />
    </BaseTitle>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      required: false,
      default: 'southern',
    },
  },
}
</script>

<style lang="scss" scoped>
.card-southern {
  @apply bg-southern text-white;
}
.card-northern {
  @apply bg-northern text-white;
}
.card-eastern {
  @apply bg-eastern text-white;
}
</style>