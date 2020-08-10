<template>
  <div>
    <template v-if="bags.length > 0">
      <BaggedListItem v-for="(bag, index) in bags" :key="index" :bag="bag" />
    </template>
    <template v-if="bags.length === 0">
      <p>You have no bags yet - time to get bagging!</p>
    </template>
  </div>
</template>

<script>
import BaggedListItem from '@/components/BaggedListItem.vue'
export default {
  components: {
    BaggedListItem,
  },
  props: {
    bags: {
      type: Array,
      required: true,
      default: function () {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
