<template>
  <div>
    <NavBar />
    <div class="container py-20 px-4 relative z-0">
      <Nuxt />
    </div>
    <Footer />
    <BagCreateModal v-if="openBagModal" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import BagCreateModal from '@/components/user/BagCreateModal'
export default {
  transition: '',
  components: {
    NavBar,
    Footer,
    BagCreateModal,
  },
  computed: {
    ...mapState({
      openBagModal: (state) => state.users.bagModalState,
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
