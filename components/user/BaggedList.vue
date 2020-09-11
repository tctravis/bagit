<template>
  <div>
    <template v-if="sortedBagsDesc.length > 0">
      <div class="grid grid-cols-12 gap-4">
        <HillCard
          v-for="(hill, index) in bagsList"
          :key="index"
          :hill="hill"
          class="col-span-12 sm:col-span-4 lg:col-span-3"
        />
      </div>
    </template>
    <template v-if="bagsList.length === 0">
      <p>You have no bags yet - time to get bagging!</p>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaggedListItem from '@/components/user/BaggedListItem.vue'
import HillCard from '@/components/hills/HillCard.vue'
export default {
  components: {
    BaggedListItem,
    HillCard,
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
      hills: (state) => state.hills.hills,
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
