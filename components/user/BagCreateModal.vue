<template>
  <BaseModal :show="bagModalState" @toggle-modal="toggleBagModal">
    <template v-slot:header>Bag it!</template>
    <template v-slot:body>
      <template v-if="currentUserId !== ''">
        <UserBagCreate :hill="hillToBag" />
      </template>
      <template v-else>
        <UserLoggedOutMessage />
      </template>
    </template>
    <template v-slot:footer></template>
  </BaseModal>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
      bagModalState: (state) => state.users.bagModalState,
      hillToBagId: (state) => state.users.hillToBagId,
    }),
    ...mapGetters('hills', ['getHillById']),
    hillToBag() {
      return this.getHillById(this.hillToBagId)
    },
  },
  methods: {
    ...mapActions('users', ['toggleBagModal']),
  },
}
</script>

<style lang="scss" scoped></style>
