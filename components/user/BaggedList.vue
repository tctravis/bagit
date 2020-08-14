<template>
  <div>
    <template v-if="sortedBagsDesc.length > 0">
      <BaggedListItem
        v-for="(bag, index) in sortedBagsDesc"
        :key="index"
        :bag="bag"
      />
    </template>
    <template v-if="sortedBagsDesc.length === 0">
      <p>You have no bags yet - time to get bagging!</p>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaggedListItem from '@/components/user/BaggedListItem.vue'
export default {
  components: {
    BaggedListItem,
  },
  computed: {
    ...mapState({
      bags: (state) => state.users.user.bags,
    }),
    //...mapGetters('users', ['sortedBagsDesc']),
    sortedBagsDesc() {
      let sortedBags = this.bags
      return sortedBags.sort((a, b) => {
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        return 0
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
