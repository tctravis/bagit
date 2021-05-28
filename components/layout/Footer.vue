<template>
  <footer
    class="h-16 fixed bg-darkgrey text-white left-0 right-0 bottom-0 z-1 flex flex-row items-center"
  >
    <div v-if="currentUserId">
      <div>Total Bagged <TotalBaggedBadge /></div>
      <div
        v-if="showMilestones"
        class="container flex flex-row items-center justify-between"
      >
        <div class="flex flex-row items-center">
          <MilestoneBadge :target="10" class="mr-2" />
          <MilestoneBadge :target="20" class="mr-2" />
          <MilestoneBadge :target="50" class="mr-2" />
          <MilestoneBadge :target="100" class="mr-2" />
          <MilestoneBadge :target="150" class="mr-2" />
          <MilestoneBadge :target="214" class="mr-2" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Log-in to start bagging!</p>
    </div>
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MilestoneBadge from '@/components/user/badges/MilestoneBadge.vue'
import TotalBaggedBadge from '@/components/user/badges/TotalBaggedBadge.vue'
export default {
  components: {
    MilestoneBadge,
    TotalBaggedBadge,
  },
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
