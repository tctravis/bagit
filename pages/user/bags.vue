<template>
  <div>
    <BasePageTitle><template v-slot:title>Bags</template></BasePageTitle>
    <BaseInfoBar>
      {{ user.userName }}, you have bagged {{ totalBagged }} of
      {{ totalHills }} Wainwrights
    </BaseInfoBar>
    <BaggingBadges />
    <BaggedList :bagsToShow="5" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaggingBadges from '@/components/user/BaggingBadges.vue'
import BaggedList from '@/components/user/BaggedList.vue'
export default {
  components: {
    BaggingBadges,
    BaggedList,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUser: (state) => state.users.currentUser,
      hills: (state) => state.hills.hills,
    }),
    ...mapGetters('users', ['getTotalAltClimbed']),
    totalBagged() {
      return this.user.bags.length
    },
    totalHills() {
      return this.hills.length
    },
  },
}
</script>

<style lang="scss" scoped></style>
