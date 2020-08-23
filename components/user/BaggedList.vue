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
import { mapGetters } from 'vuex'
import BaggedListItem from '@/components/user/BaggedListItem.vue'
export default {
  components: {
    BaggedListItem,
  },
  computed: {
    ...mapGetters('users', ['getUserBags']),
    bags() {
      // https://stackoverflow.com/questions/52581488/how-can-i-clone-data-from-vuex-state-to-local-data
      let bags = [...this.getUserBags]
      return bags
    },
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
