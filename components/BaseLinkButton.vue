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
          btnClasses.push('bg-northwestern', 'text-color-body')
          break
        case 'eastern':
          btnClasses.push('bg-eastern', 'text-color-body')
          break
        case 'southern':
          btnClasses.push('bg-southern', 'text-color-body')
          break
        default:
          btnClasses.push('bg-grey-dark', 'text-white')
      }
      return btnClasses.join(' ')
    },
  },
}
</script>
