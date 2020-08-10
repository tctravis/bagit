<template>
  <div>
    <NavBar />
    <div class="container py-16">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
export default {
  components: {
    NavBar,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
.overflow-hidden {
  overflow: hidden;
}
</style>
