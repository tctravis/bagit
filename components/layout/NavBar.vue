<template>
  <div class="h-16 bg-grey-darkest text-white fixed left-0 right-0 top-0 z-50">
    <div class="h-16 px-2 md:px-6 flex flex-row items-center justify-between">
      <nuxt-link class="text-lg font-bold uppercase flex items-center" to="/"
        ><FellBaggrLogo class="fill-eastern mr-1 h-6" />Fell baggr</nuxt-link
      >
      <UserBadgesTotalBaggedBadge v-if="currentUserId" class="ml-4 md:ml-6" />
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          v-show="navOpen"
          class="z-20 fixed inset-0 transition-opacity md:hidden"
          @keydown.esc="navOpen = false"
        >
          <div
            class="absolute inset-0 bg-black opacity-50 md:hidden"
            tabindex="0"
            @click="navOpen = false"
          ></div>
        </div>
      </transition>

      <div
        class="collapseNav"
        :class="
          navOpen ? 'transform translate-x-0' : 'transform translate-x-105'
        "
      >
        <BaseClose class="h-16 bg-grey-dark px-4" @click="toggleMenu" />
        <nav
          class="flex flex-col divide-y md:divide-y-0 md:flex-row md:items-center"
        >
          <BaseMenuLink route="/hills/" @click.native="toggleMenu"
            >Find a fell</BaseMenuLink
          >

          <BaseMenuLink
            v-if="currentUserId"
            route="/user/dashboard"
            @click.native="toggleMenu"
            >Your progress</BaseMenuLink
          >
          <BaseMenuLink
            v-if="currentUserId"
            route="/user/edit-profile"
            @click.native="toggleMenu"
            >Profile</BaseMenuLink
          >
        </nav>
      </div>
      <nuxt-link
        v-if="!currentUserId"
        to="/user/login"
        class="ml-auto md:ml-4 bg-theme-midgrey button"
        >Login</nuxt-link
      ><nuxt-link
        v-if="currentUserId"
        to="/user/login"
        class="ml-auto md:ml-4 bg-theme-midgrey button"
        @click.native="signOut"
        >Logout</nuxt-link
      >
      <div class="md:hidden px-4 py-4 cursor-pointer" @click="toggleMenu">
        <font-awesome-icon :icon="['fa', 'bars']" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import FellBaggrLogo from '~/assets/icons/backpack.svg?inline'

export default {
  components: {
    FellBaggrLogo,
  },
  data() {
    return {
      navOpen: false,
    }
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
    }),
  },
  methods: {
    toggleMenu() {
      this.navOpen = this.navOpen ? false : true
    },
    ...mapActions({
      signOut: 'users/signOut',
    }),
  },
  watch: {
    navOpen: {
      // https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l
      immediate: true,
      handler(navOpen) {
        if (process.client) {
          if (navOpen)
            document.body.classList.add(
              'overflow-hidden',
              'md:overflow-visible'
            )
          else
            document.body.classList.remove(
              'overflow-hidden',
              'md:overflow-visible'
            )
        }
      },
    },
  },
}
</script>
