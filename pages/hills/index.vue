<template>
  <LayoutPageWrapper>
    <template #header>
      <BasePageTitle><template #title>Find a fell</template></BasePageTitle>
    </template>
    <template #main>
      <HillsHillList />
    </template>
  </LayoutPageWrapper>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Find a fell')
    this.$store.dispatch('pages/setPageTheme', 'primary')
  },
}
</script>

<style lang="scss" scoped></style>
