<template>
  <footer
    class="bg-southern text-white left-0 right-0 bottom-0 flex flex-row items-center justify-end z-1 p-4"
  >
    <span>&copy; 2020 Toby Travis</span>
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import Badge from '@/components/widgets/Badge.vue'
export default {
  // components: {
  //   Badge,
  // },
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
