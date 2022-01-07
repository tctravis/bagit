<template>
  <div>
    <HillList />
  </div>
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
