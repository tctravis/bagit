<template>
  <BaseInfoBar class="text-xl" :class="bgThemeClass"
    >Congratulations, you've already bagged this fell!</BaseInfoBar
  >
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'dark',
      required: true,
    },
  },
  computed: {
    bgThemeClass() {
      return 'bg-theme-' + this.theme
    },
  },
}
</script>

<style lang="scss" scoped>
</style>