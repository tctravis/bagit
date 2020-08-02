<template>
  <div class="rounded-full w-8 h-8 text-white flex items-center justify-center">
    <span>{{ area }}</span>
  </div>
</template>

<script>
export default {
  props: {
    area: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
