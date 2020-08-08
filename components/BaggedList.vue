<template>
  <div>
    <template v-if="bags.length > 0">
      <div
        v-for="(bag, index) in bags"
        :key="index"
        class="w-full flex flex-row justify-between items-center"
      >
        <!-- <AreaIcon
          :area="bag.area"
          :class="('bg-' + bag.areaName) | removeSpaces | lowercase"
        /> -->
        <h3>
          <nuxt-link :to="{ name: 'hills-id', params: { id: bag.hill_id } }">
            {{ bag.hill_name }}
          </nuxt-link>
        </h3>
        <span>{{ $moment(bag.date).format('DD MM YY') }}</span>
      </div>
    </template>
    <template v-if="bags.length === 0">
      <p>You have no bags yet - time to get bagging!</p>
    </template>
  </div>
</template>

<script>
// import AreaIcon from '@/components/AreaIcon.vue'
export default {
  // components: {
  //   AreaIcon,
  // },
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
