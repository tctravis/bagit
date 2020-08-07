<template>
  <div>
    <h2>Bagged List</h2>
    <template v-if="bags.length > 0">
      <div v-for="bag in bags" :key="bag.hill_id" class="w-full">
        <nuxt-link
          class="flex flex-row justify-start items-center py-2"
          :to="{ name: 'hills-id', params: { id: bag.hill_id } }"
        >
          <h3 class="text-lg text-left mx-2">
            {{ bag.hill_name }}
          </h3>
          <p>{{ $moment(bag.date.toDate()).format('D M YY') }}</p>
        </nuxt-link>
      </div>
    </template>
    <template v-if="bags.length === 0">
      <p>You have no bags yet - time to get bagging!</p>
    </template>
  </div>
</template>

<script>
export default {
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
