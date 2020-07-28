<template>
  <div class="pt-12">
    <NavBar />
    <div class="container py-4">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
export default {
  components: {
    NavBar,
    Footer,
  },
}
</script>

<style lang="sass" scoped></style>
