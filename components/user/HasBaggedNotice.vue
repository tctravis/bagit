<template>
  <BaseInfoBar class="text-xl" :class="bgThemeClass"
    >Congratulations, you've bagged {{ hillName }}!</BaseInfoBar
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
    hillName: {
      type: String,
      default: 'this fell',
      required: false,
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