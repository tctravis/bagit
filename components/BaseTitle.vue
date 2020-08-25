<script>
export default {
  render: function (createElement) {
    const titleClasses = this.titleClasses.join(' ')
    const titleObject = {
      class: titleClasses,
    }
    return createElement(
      'h' + this.level, // tag name
      titleObject,
      this.$slots.default // array of children
    )
  },
  data() {
    return {
      titleClasses: [],
    }
  },
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
  },
  methods: {
    setDecorationClass() {
      if (this.hasDecoration) {
        this.titleClasses.push('decorated-header')
      }
    },
    setTailwindClasses() {
      let classArray = []
      switch (this.level) {
        case 1:
          classArray.push(['text-3xl'])
          break
        case 2:
          classArray.push(['text-2xl'])
          break
        case 3:
          classArray.push(['text-xl'])
          break
        case 4:
          classArray.push(['text-lg'])
          break
        case 5:
          classArray.push(['text-md'])
          break
      }
      this.titleClasses.push(classArray)
    },
  },
  mounted() {
    this.setDecorationClass()
    //this.setTailwindClasses()
  },
}
</script>

<style lang="scss" scoped></style>
