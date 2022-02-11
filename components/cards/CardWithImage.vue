<template>
  <div :class="cardClasses" class="flow" style="--flow-space: 0.5rem">
    <slot name="img" />
    <BaseTitle :level="2" :has-decoration="false"
      ><slot name="title"
    /></BaseTitle>
    <BaseParagraph><slot name="text" /></BaseParagraph>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    cardClasses() {
      const cardClasses = []
      switch (this.theme) {
        case 'black':
          cardClasses.push('bg-black', 'text-white')
          break
        case 'dark':
          cardClasses.push('bg-darkgrey', 'text-white')
          break
        default:
          cardClasses.push('bg-transparent', 'text-white')
      }
      return cardClasses.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped></style>
