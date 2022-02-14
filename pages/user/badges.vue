<template>
  <LayoutPageWrapper>
    <template #header>
      <BasePageTitle><template #title>Badges</template></BasePageTitle>
    </template>
    <template #main>
      <template v-if="currentUserId === ''">
        <LoggedOutMessage />
      </template>
      <template v-else>
        <BaseInfoBar>
          Celebrate your progress by collecting milestone badges and challenge
          awards.
        </BaseInfoBar>
      </template>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 sm:col-span-6">
          <BaseTitle :level="2" :has-decoration="true"
            >Milestone Badges</BaseTitle
          >
          <UserBadgesBadgesMilestones />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <BaseTitle :level="2" :has-decoration="true"
            >Challenge Awards</BaseTitle
          >
          <UserBadgesBadgesChallenges />
        </div>
      </div>
    </template>
  </LayoutPageWrapper>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUserId: (state) => state.users.currentUserId,
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Badges')
  },
}
</script>

<style lang="scss" scoped></style>
