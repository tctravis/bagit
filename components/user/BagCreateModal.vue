<template>
  <BaseModal :show="bagModalState" v-on:toggle-modal="toggleBagModal">
    <template v-slot:header>
      <h1>Bag it!</h1>
    </template>

    <template v-slot:body>
      <BagCreate :hill="hillToBag" />
    </template>

    <template v-slot:footer> </template>
  </BaseModal>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import BagCreate from '@/components/user/BagCreate.vue'

export default {
  components: {
    BagCreate,
  },
  computed: {
    ...mapState({
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
