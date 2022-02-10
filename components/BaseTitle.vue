<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
    hasDecoration: {
      type: Boolean,
      default: false,
    },
    srOnly: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    areaTheme: {
      type: String,
      default: null,
    },
    isDisplayFont: {
      type: Boolean,
      default: false,
    },
    customClasses: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      titleClasses: [],
    }
  },
  mounted() {
    this.setDecorationClass()
    this.setThemeClass()
    this.setTailwindClasses()
    this.setAreaTheme()
    this.setCustomClasses()
  },
  methods: {
    setCustomClasses() {
      this.customClasses.length > 0
        ? this.titleClasses.push(this.customClasses)
        : false
    },
    setAreaTheme() {
      this.areaTheme ? this.titleClasses.push(`text-${this.areaTheme}`) : false
    },
    setThemeClass() {
      this.titleClasses.push('border-theme-' + this.theme)
    },
    setDecorationClass() {
      if (this.hasDecoration) {
        this.titleClasses.push('decorated-header')
      }
    },
    setTailwindClasses() {
      // let classArray = ['pt-2 mb-4']
      let classArray = []
      switch (this.level) {
        case 1:
          classArray.push('text-3xl')
          break
        case 2:
          classArray.push('text-2xl')
          break
        case 3:
          classArray.push('text-xl')
          break
        case 4:
          classArray.push('text-lg')
          break
        case 5:
          classArray.push('text-md')
          break
      }
      if (this.srOnly) {
        classArray.push('sr-only')
      }
      if (this.isDisplayFont) {
        classArray.push('font-display')
      }
      this.titleClasses = this.titleClasses.concat(classArray)
    },
  },
  render: function (createElement) {
    const titleClasses = this.titleClasses.join(' ')

    const titleObject = {
      attrs: {
        class: titleClasses,
      },
    }
    return createElement(
      'h' + this.level, // tag name
      titleObject,
      this.$slots.default // array of children
    )
  },
}
</script>

<style lang="scss" scoped></style>
