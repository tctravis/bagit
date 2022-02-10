<template>
  <BaseCard :class="cardClasses" class="rounded-lg flow px-4 py-4">
    <template #header>
      <div class="flex items-start justify-between">
        <BaseTitle
          :area-theme="areaTheme"
          :level="2"
          :has-decoration="false"
          :custom-classes="['font-bold']"
          ><slot name="title"
        /></BaseTitle>
        <slot name="icon" />
      </div>
    </template>
    <template #body>
      <BaseParagraph><slot name="text" /></BaseParagraph>
    </template>
    <template #footer>
      <div class="flex self-end justify-end">
        <slot name="action" />
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'dark-darkgrey',
    },
  },
  computed: {
    cardClasses() {
      const cardClasses = []
      switch (this.baseTheme) {
        case 'dark':
          cardClasses.push('bg-black', 'text-white')
          break
        case 'darkgrey':
          cardClasses.push('bg-darkgrey', 'text-white')
          break
        default:
          cardClasses.push('bg-lightgrey', 'text-darkgrey')
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
