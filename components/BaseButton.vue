<template>
  <button
    class="py-1 px-4 rounded flex flex-row whitespace-nowrap shadow disabled:opacity-50 font-bold transition-colors"
    :class="buttonClasses"
    v-on="$listeners"
  >
    <slot />
    <div v-if="faIconClass">
      <font-awesome-icon :icon="['fa', faIconClass]" class="ml-2" />
    </div>
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
    // buttonClass: {
    //   type: String,
    //   default: null,
    // },
    faIconClass: {
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
  // computed: {
  //   btnClasses() {
  //     const btnClasses = []
  //     switch (this.theme) {
  //       case 'northwestern':
  //         btnClasses.push('bg-northwestern', 'text-color-body')
  //         break
  //       case 'eastern':
  //         btnClasses.push('bg-eastern', 'text-color-body')
  //         break
  //       case 'southern':
  //         btnClasses.push('bg-southern', 'text-color-body')
  //         break
  //       default:
  //         btnClasses.push('bg-grey-dark', 'text-white')
  //     }
  //     return btnClasses.join(' ')
  //   },
  // },
}
</script>
