<template>
  <div
    :class="areaIconClass"
    class="rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold"
  >
    <span>{{ hill.area }}</span>
  </div>
</template>

<script>
export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hasBagged: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    areaIconClass() {
      let themeClass = null
      if (this.hasBagged) {
        themeClass = 'bg-theme-greydark'
      } else {
        let areaClassName = this.$options.filters.removeSpaces(
          this.hill.areaName
        )
        themeClass =
          'bg-theme-' + this.$options.filters.lowercase(areaClassName)
      }
      return themeClass
    },
  },
}
</script>

<style lang="scss" scoped></style>
