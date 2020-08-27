<template>
  <BaseModal :show="bagModalState" @toggle-modal="toggleBagModal">
    <template v-slot:header>Bag it!</template>
    <template v-slot:body>
      <template v-if="currentUserId !== ''">
        <BagCreate :hill="hillToBag" />
      </template>
      <template v-else>
        <LoggedOutMessage />
      </template>
    </template>
    <template v-slot:footer> </template>
  </BaseModal>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import LoggedOutMessage from '@/components/user/LoggedOutMessage.vue'
import BagCreate from '@/components/user/BagCreate.vue'

export default {
  components: {
    BagCreate,
  },
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
