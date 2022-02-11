<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
    headerFontSize: {
      type: Number,
      default: null,
    },
    hasDecoration: {
      type: Boolean,
      default: false,
    },
    isDisplayFont: {
      type: Boolean,
      default: false,
    },
    element: {
      type: String,
      default: null,
    },
  },
  computed: {
    titleClasses() {
      const titleClasses = []
      const fontSizeLevel = this.headerFontSize
        ? this.headerFontSize
        : this.level
      switch (fontSizeLevel) {
        case 1:
          titleClasses.push('text-3xl')
          break
        case 2:
          titleClasses.push('text-2xl')
          break
        case 3:
          titleClasses.push('text-xl')
          break
        case 4:
          titleClasses.push('text-lg')
          break
        case 5:
          titleClasses.push('text-md')
          break
      }
      if (this.isDisplayFont) {
        titleClasses.push('font-display')
      }
      if (this.hasDecoration) {
        titleClasses.push('decorated-header')
      }
      return titleClasses
    },
  },
  render(createElement) {
    const elDataObject = {
      class: this.titleClasses,
      props: {},
    }
    if (!this.element) {
      return createElement('h' + this.level, elDataObject, this.$slots.default)
    } else {
      return createElement(this.element, elDataObject, this.$slots.default)
    }
  },
}
</script>

<style lang="scss" scoped></style>
