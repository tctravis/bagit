<template>
  <div class="border mr-2 mb-2 w-full">
    <div
      class="p-2"
      :class="('bg-' + hill.areaName) | removeSpaces | lowercase"
    >
      <span class="text-sm uppercase">{{ hill.areaName }}</span>
    </div>
    <div class="p-2">
      <nuxt-link :to="{ name: 'hills-id', params: { id: hill.id } }">
        <h2 class="text-3xl">{{ hill.name }}</h2>
      </nuxt-link>

      <HeightRating
        :height-rating="hill.heightRating"
        :area-class-name="hill.areaClassName"
      />
      <p v-if="hasBagged">Well done, you've climbed this hill</p>
      <p>Altitude: {{ hill.height_m }}</p>
      <p>OS grid ref: {{ hill.os_grid_ref }}</p>
      <p>OS map: {{ hill.os_map }}</p>
      <BaseButton button-class="bg-southern">Climbed Hill</BaseButton>
    </div>
  </div>
</template>

<script>
import HeightRating from '@/components/HeightRating.vue'
export default {
  components: {
    HeightRating,
  },
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hillsBagged: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasBagged() {
      return this.hillsBagged.includes(this.hill.id)
    },
  },
}
</script>

<style lang="sass" scoped></style>
