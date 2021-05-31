<script>
export default {
  props: {
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    hasDecoration: {
      type: Boolean,
      required: false,
      default: false,
    },
    srOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    theme: {
      type: String,
      required: false,
      default: 'dark',
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
  },
  methods: {
    setThemeClass() {
      this.titleClasses.push('border-theme-' + this.theme)
    },
    setDecorationClass() {
      if (this.hasDecoration) {
        this.titleClasses.push('decorated-header')
      }
    },
    setTailwindClasses() {
      let classArray = ['pt-2 mb-4']
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
