<template>
  <PageWrapper>
    <template #header>
      <BasePageTitle><template #title>Find a fell</template></BasePageTitle>
    </template>
    <template #main>
      <HillList />
    </template>
  </PageWrapper>
</template>

<script>
import HillList from '@/components/hills/HillList.vue'
export default {
  components: {
    HillList,
  },
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Find a fell')
    this.$store.dispatch('pages/setPageTheme', 'primary')
  },
}
</script>

<style lang="scss" scoped></style>
