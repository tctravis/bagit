<template>
  <header class="h-16 bg-darkgrey text-white fixed left-0 right-0 top-0 z-10">
    <div class="h-16 container flex flex-row items-center justify-between">
      <div>
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
        <BaseClose class="h-16 bg-darkgrey px-4" @click="toggleMenu" />
        <nav
          class="flex flex-col divide-y md:divide-y-0 md:flex-row md:items-center"
        >
          <BaseMenuLink route="/hills/" @click.native="toggleMenu"
            >Fells</BaseMenuLink
          >
          <client-only>
            <BaseMenuLink
              v-if="currentUserId"
              route="/user/stats"
              @click.native="toggleMenu"
              >Stats</BaseMenuLink
            ></client-only
          >
          <client-only>
            <BaseMenuLink
              v-if="currentUserId"
              route="/user/edit-profile"
              @click.native="toggleMenu"
              >Profile</BaseMenuLink
            >
          </client-only>
        </nav>
      </div>

      <client-only
        ><nuxt-link
          v-if="!currentUserId"
          to="/user/login"
          class="ml-auto md:ml-4 bg-theme-midgrey button"
          >Login</nuxt-link
        ></client-only
      >
      <client-only
        ><nuxt-link
          v-if="currentUserId"
          to="/user/login"
          class="ml-auto md:ml-4 bg-theme-midgrey button"
          @click.native="signOut"
          >Logout</nuxt-link
        >
      </client-only>
      <div class="md:hidden pl-4 py-4 cursor-pointer" @click="toggleMenu">
        <font-awesome-icon :icon="['fa', 'bars']" />
      </div>
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
