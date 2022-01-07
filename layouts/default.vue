<template>
  <div class="py-16">
    <NavBar />
    <!-- <PageBanner
      :theme="pageTheme"
      :img-url="require('~/assets/img/banner.jpg')"
      >{{ pageTitle }}</PageBanner
    > -->
    <!-- <div class="container py-4 relative z-0"> -->
    <Nuxt />
    <!-- </div> -->
    <Footer v-if="currentUserId" />
    <!-- <BagCreateModal v-if="openBagModal" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/layout/NavBar'
// import PageBanner from '@/components/layout/PageBanner'
import Footer from '@/components/layout/Footer'
// import BagCreateModal from '@/components/user/BagCreateModal'
export default {
  transition: '',
  components: {
    NavBar,
    // PageBanner,
    Footer,
    // BagCreateModal,
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
