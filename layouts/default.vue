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
  transition: '',
  components: {
    NavBar,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
