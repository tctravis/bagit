<template>
  <BaseInfoBar>
    <p>
      Well done {{ user.userName }}, you have bagged {{ totalBagged }} of
      {{ totalHills }} Wainwrights. Keep on bagging!
    </p>
  </BaseInfoBar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      hills: (state) => state.hills.hills,
    }),
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
