<template>
  <div class="w-full py-2">
    <div
      class="flex flex-row justify-start items-center cursor-pointer"
      @click="toggleDetails"
    >
      <HillsAreaIcon
        :area="bag.area"
        :class="('bg-' + bag.areaName) | removeSpaces | lowercase"
      />
      <h3 class="text-lg text-left mx-2">
        {{ bag.name }}
      </h3>
      <div class="ml-auto">
        <template v-if="!detailsExpanded">
          <font-awesome-icon :icon="['fa', 'chevron-right']" />
        </template>
        <template v-if="detailsExpanded">
          <font-awesome-icon :icon="['fa', 'chevron-down']" />
        </template>
      </div>
    </div>
    <div
      v-if="detailsExpanded"
      class="w-full flex items-start bg-lightgrey p-2 rounded mt-2"
    >
      <p class="whitespace-nowrap mr-4">
        {{ $moment(bag.date).format('DD MM YY') }}
      </p>
      <div>
        <BaseRating
          v-if="bag.rating"
          :rating-out-of="5"
          :rating="parseInt(bag.rating)"
          :area-class-name="bag.areaClassName"
        />
        <p v-if="bag.comments" class="ml-auto mb-2">{{ bag.comments }}</p>
        <nuxt-link
          :to="{ name: 'hills-id', params: { id: bag.hill_id } }"
          class="block underline text-northern hover:text-central"
        >
          {{ bag.name }} info
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bag: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      detailsExpanded: false,
    }
  },
  methods: {
    toggleDetails() {
      return (this.detailsExpanded = this.detailsExpanded ? false : true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
