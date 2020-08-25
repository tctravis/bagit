<template>
  <div>
    <template v-if="sortedBagsDesc.length > 0">
      <BaggedListItem
        v-for="(bag, index) in bagsList"
        :key="index"
        :bag="bag"
      />
    </template>
    <template v-if="bagsList.length === 0">
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
  props: {
    bagsToShow: {
      type: Number,
      required: false,
      default: 214,
    },
  },
  computed: {
    ...mapState({
      userBags: (state) => state.users.user.bags,
    }),
    sortedBagsDesc() {
      let sortedBags = [...this.userBags]
      return sortedBags.sort((a, b) => {
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        return 0
      })
    },
    bagsList() {
      let bagsList = this.sortedBagsDesc.slice(0, this.bagsToShow)
      return bagsList
    },
  },
}
</script>

<style lang="scss" scoped></style>
