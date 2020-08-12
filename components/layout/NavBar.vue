<template>
  <div>
    <header
      class="bg-southern text-white fixed left-0 right-0 top-0 h-12 flex flex-row items-center z-20"
    >
      <div class="container">
        <div class="flex flex-row items-center justify-between py-2">
          <nuxt-link to="/">BAGGR</nuxt-link>
          <nav class="flex flex-row">
            <nuxt-link class="mx-2" to="/hills/list">Explore fells</nuxt-link>
            <nuxt-link v-if="currentUserId !== ''" to="/user/dashboard"
              >Your progress</nuxt-link
            >
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
    }),
  },
}
</script>
