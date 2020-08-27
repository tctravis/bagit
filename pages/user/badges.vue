<template>
  <div>
    <BasePageTitle><template v-slot:title>Badges</template></BasePageTitle>
    <template v-if="currentUserId === ''">
      <LoggedOutMessage />
    </template>
    <template v-else>
      <BaseInfoBar>
        Celebrate your progress by collecting milestone badges and challenge
        awards.
      </BaseInfoBar>
    </template>
    <BaseTitle :level="2" :has-decoration="true">Milestone Badges</BaseTitle>
    <BadgesMilestones />
    <BaseTitle :level="2" :has-decoration="true">Challenge Awards</BaseTitle>
    <BadgesChallenges />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BadgesMilestones from '@/components/user/badges/BadgesMilestones.vue'
import BadgesChallenges from '@/components/user/badges/BadgesChallenges.vue'
export default {
  components: {
    BadgesMilestones,
    BadgesChallenges,
  },
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
}
</script>

<style lang="scss" scoped></style>
