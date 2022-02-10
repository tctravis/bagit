<template>
  <nuxt-link :to="link" class="button font-bold" :class="btnClasses">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: null,
    },
  },
  computed: {
    btnClasses() {
      const btnClasses = []
      switch (this.theme) {
        case 'northwestern':
          btnClasses.push('bg-northwestern', 'text-darkgrey')
          break
        case 'eastern':
          btnClasses.push('bg-eastern', 'text-darkgrey')
          break
        case 'southern':
          btnClasses.push('bg-southern', 'text-darkgrey')
          break
        default:
          btnClasses.push('bg-darkgrey', 'text-white')
      }
      return btnClasses.join(' ')
    },
  },
}
</script>
