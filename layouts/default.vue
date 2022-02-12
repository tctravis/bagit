<template>
  <div class="h-screen py-16">
    <NavBar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/layout/NavBar'

export default {
  transition: '',
  components: {
    NavBar,
  },
  computed: {
    ...mapState({
      pageTitle: (state) => state.pages.page.title,
      pageTheme: (state) => state.pages.page.pageTheme,
      openBagModal: (state) => state.users.bagModalState,
      currentUserId: (state) => state.users.currentUserId,
    }),
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
