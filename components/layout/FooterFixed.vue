<template>
  <footer
    class="z-50 h-16 fixed bg-grey-dark text-white left-0 right-0 bottom-0 z-1 flex flex-row items-center"
  >
    <div class="container">
      <div v-if="currentUserId">
        <UserTotalBaggedBadge />
        <div
          v-if="showMilestones"
          class="container flex flex-row items-center justify-between"
        >
          <div class="flex flex-row items-center">
            <UserMilestoneBadge :target="10" class="mr-2" />
            <UserMilestoneBadge :target="20" class="mr-2" />
            <UserMilestoneBadge :target="50" class="mr-2" />
            <UserMilestoneBadge :target="100" class="mr-2" />
            <UserMilestoneBadge :target="150" class="mr-2" />
            <UserMilestoneBadge :target="214" class="mr-2" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>Log-in to start bagging!</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      showMilestones: false,
    }
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
    }),
  },
  methods: {
    ...mapActions({
      signOut: 'users/signOut',
    }),
  },
}
</script>
