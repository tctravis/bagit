<template>
  <div
    class="rounded-lg px-4 py-4 bg-gradient-to-b from-grey-darkest to-black text-white flex flex-col"
  >
    <div class="flex gap-2 mb-4 items-start justify-between">
      <BaseTitle
        :level="2"
        :header-font-size="3"
        class="font-bold leading-tight"
        ><slot name="title"
      /></BaseTitle>
      <slot name="icon" />
    </div>
    <div class="mb-4">
      <p><slot name="text" /></p>
    </div>
    <div class="flex mt-auto">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'grey-darkest',
    },
  },
  computed: {
    cardClasses() {
      const cardClasses = []
      switch (this.baseTheme) {
        case 'black':
          cardClasses.push('bg-black', 'text-white')
          break
        case 'grey-darkest':
          cardClasses.push('bg-grey-darkest', 'text-white')
          break
        default:
          cardClasses.push('bg-lightgrey', 'text-color-body')
      }
      return cardClasses.join(' ')
    },
    baseTheme() {
      return this.theme.split('-')[0]
    },
    areaTheme() {
      return this.theme.split('-')[1]
    },
  },
}
</script>

<style lang="scss" scoped></style>
