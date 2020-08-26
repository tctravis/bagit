<template>
  <header
    class="bg-southern text-white fixed left-0 right-0 top-0 z-10 flex flex-row items-center"
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
        class="z-20 fixed inset-0 transition-opacity"
      >
        <div
          @click="navOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>

    <div
      class="collapseNav"
      :class="navOpen ? 'transform translate-x-0' : 'transform translate-x-105'"
    >
      <div
        @click="toggleMenu"
        class="p-4 md:hidden flex flex-row justify-end items-center cursor-pointer"
      >
        Close
        <font-awesome-icon :icon="['fa', 'times']" :class="'ml-2 text-xl'" />
      </div>
      <nav
        class="flex flex-col divide-y md:divide-y-0 md:flex-row md:items-center"
      >
        <nuxt-link
          @click.native="toggleMenu"
          class="p-4 hover:bg-fareastern"
          to="/hills/list"
          >Find a fell</nuxt-link
        >
        <nuxt-link
          @click.native="toggleMenu"
          class="p-4 hover:bg-fareastern"
          v-if="currentUserId !== ''"
          to="/user/bags"
          >Your Bags</nuxt-link
        >
        <nuxt-link
          @click.native="toggleMenu"
          class="p-4 hover:bg-fareastern"
          v-if="currentUserId !== ''"
          to="/user/stats"
          >Your statistics</nuxt-link
        >
        <nuxt-link
          @click.native="toggleMenu"
          v-if="currentUserId !== ''"
          class="p-4 hover:bg-fareastern"
          to="/user/edit-profile"
          >Edit profile</nuxt-link
        >
      </nav>
    </div>
    <div @click="toggleMenu" class="md:hidden px-4 py-4 ml-auto cursor-pointer">
      <font-awesome-icon :icon="['fa', 'bars']" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
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
  },
  watch: {
    navOpen: {
      // https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l
      immediate: true,
      handler(navOpen) {
        if (process.client) {
          if (navOpen) document.body.style.setProperty('overflow', 'hidden')
          else document.body.style.removeProperty('overflow')
        }
      },
    },
  },
}
</script>
