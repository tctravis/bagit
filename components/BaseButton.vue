<template>
  <button
    class="py-1 px-4 rounded flex gap-2 flex-row whitespace-nowrap shadow disabled:opacity-50 font-bold transition-colors"
    :class="buttonClasses"
    v-on="$listeners"
  >
    <slot name="text" />
    <slot name="icon" />
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: null,
    },
    iconClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    buttonClasses() {
      const btnClasses = []
      btnClasses.push(`bg-${this.theme}`)
      switch (this.theme) {
        case 'grey-dark':
          btnClasses.push(`hover:bg-grey-darker`, `text-grey-lightest`)
          break
        case 'northern':
          btnClasses.push(
            `hover:bg-${this.theme}-dark`,
            `text-${this.theme}-contrast`
          )
          break
        case 'fareastern':
          btnClasses.push(
            `hover:bg-${this.theme}-dark`,
            `text-${this.theme}-contrast`
          )
          break
        default:
          btnClasses.push(
            `hover:bg-${this.theme}-light`,
            `text-${this.theme}-contrast`
          )
      }
      return btnClasses.join(' ')
    },
  },
}
</script>
