<template>
  <div>
    <template v-if="currentUserId === ''">
      <LoggedOutMessage />
    </template>
    <template v-else>
      <template v-if="totalBagged !== 0">
        <BaseInfoBar>
          {{ user.userName }}, you have bagged {{ totalBagged }} of
          {{ totalHills }} Wainwrights
        </BaseInfoBar>
        <BaggedList :bags-to-show="12" />
      </template>
      <template v-else>
        <BaseInfoBar>
          {{ user.userName }}, you haven't bagged anything yet! Why not find
          your
          <BaseLink to="/hills/list">first fell to bag?</BaseLink>
        </BaseInfoBar>
      </template>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PageBanner from '@/components/layout/PageBanner.vue'
import LoggedOutMessage from '@/components/user/LoggedOutMessage.vue'
import BaggedList from '@/components/user/BaggedList.vue'
export default {
  components: {
    PageBanner,
    LoggedOutMessage,
    BaggedList,
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Bags')
  },
}
</script>

<style lang="scss" scoped></style>
