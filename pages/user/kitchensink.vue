<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Kitchen sink</template></BasePageTitle
    >
    <ChartOverallProgress
      v-if="user.bags.length > 0"
      :bags="user.bags"
      class="mb-6"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ChartOverallProgress from '@/components/user/ChartOverallProgress.vue'
export default {
  components: {
    ChartOverallProgress,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
