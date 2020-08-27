<template>
  <header
    class="bg-southern text-white fixed left-0 right-0 top-0 z-10 flex flex-row items-center justify-between"
  >
    <div class="px-4 py-4">
      <nuxt-link to="/">FELL BAGGR</nuxt-link>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="navOpen = false"
        v-show="navOpen"
        class="z-20 fixed inset-0 transition-opacity md:hidden"
      >
        <div
          @click="navOpen = false"
          class="absolute inset-0 bg-black opacity-50 md:hidden"
          tabindex="0"
        ></div>
      </div>
    </transition>

    <div
      class="collapseNav"
      :class="navOpen ? 'transform translate-x-0' : 'transform translate-x-105'"
    >
      <BaseClose @click="toggleMenu" class="p-4" />
      <nav
        class="flex flex-col divide-y md:divide-y-0 md:flex-row md:items-center"
      >
        <BaseMenuLink
          @click.native="toggleMenu"
          route="/hills/list"
          icon="mountain"
          icon-class="text-md"
          >Fells</BaseMenuLink
        >
        <BaseMenuLink
          @click.native="toggleMenu"
          route="/user/bags"
          icon="hiking"
          icon-class="text-xl"
          >Bags</BaseMenuLink
        >
        <BaseMenuLink
          @click.native="toggleMenu"
          route="/user/stats"
          icon="chart-bar"
          icon-class="text-xl"
          >Stats</BaseMenuLink
        >
        <BaseMenuLink
          @click.native="toggleMenu"
          route="/user/badges"
          icon="certificate"
          icon-class="text-xl"
          >Badges</BaseMenuLink
        >
        <BaseMenuLink
          v-if="$fireAuth.currentUser !== null"
          @click.native="toggleMenu"
          route="/user/edit-profile"
          icon="user"
          icon-class="text-xl"
          >Profile</BaseMenuLink
        >
      </nav>
    </div>
    <BaseMenuLink
      v-if="currentUserId === ''"
      route="/user/login"
      icon="user"
      icon-class="text-xl"
      class="ml-auto"
      >Login</BaseMenuLink
    >
    <BaseMenuLink
      @click.native="signOut"
      v-if="currentUserId !== ''"
      route="/user/login"
      icon="user"
      icon-class="text-xl"
      class="ml-auto"
      >Logout</BaseMenuLink
    >
    <div @click="toggleMenu" class="md:hidden px-4 py-4 cursor-pointer">
      <font-awesome-icon :icon="['fa', 'bars']" />
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
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
