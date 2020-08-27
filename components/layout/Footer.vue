<template>
  <footer
    class="fixed bg-southern text-white left-0 right-0 bottom-0 flex flex-row items-center justify-between z-1 p-4"
  >
    <div class="flex flex-row items-center">
      <MilestoneBadge :target="5" class="mr-2" />
      <MilestoneBadge :target="10" class="mr-2" />
      <MilestoneBadge :target="20" class="mr-2" />
      <MilestoneBadge :target="50" class="mr-2" />
    </div>
    <span>&copy; 2020 Toby Travis</span>
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MilestoneBadge from '@/components/user/badges/MilestoneBadge.vue'
export default {
  components: {
    MilestoneBadge,
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
