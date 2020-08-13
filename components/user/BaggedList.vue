<template>
  <div>
    <template v-if="bagsSorted.length > 0">
      <BaggedListItem
        v-for="(bag, index) in bagsSorted"
        :key="index"
        :bag="bag"
      />
    </template>
    <template v-if="bagsSorted.length === 0">
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
  data() {
    return {
      sortBy: 'date',
      sortAsc: true,
    }
  },
  computed: {
    ...mapState({
      bags: (state) => state.users.user.bags,
    }),
    bagsSorted() {
      let sortedBags = this.bags.slice(0).sort((a, b) => {
        if (a[this.sortBy] > b[this.sortBy]) return -1
        if (a[this.sortBy] < b[this.sortBy]) return 1
      })
      return sortedBags
    },
  },
}
</script>

<style lang="scss" scoped></style>
