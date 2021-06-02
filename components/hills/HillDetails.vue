<template>
  <div>
    <div class="bg-lightgrey rounded p-2 mb-2">
      <h3 class="sr-only">Statistics</h3>
      <div class="flex flex-row justify-between items-center mb-2">
        <p class="text-lg">Wainwright #{{ hill.id }}</p>
        <AreaIcon :hill="hill" />
      </div>
      <div class="flex flex-row justify-between items-center mb-2">
        <HeightRating
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
          :height="hill.height_m"
          :show-height="true"
        />
        <p>Prominence: {{ hill.prom_m }}m</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AreaIcon from '@/components/hills/AreaIcon.vue'
import HeightRating from '@/components/hills/HeightRating.vue'
export default {
  components: {
    AreaIcon,
    HeightRating,
  },
  props: {
    hill: {
      type: Object,
      required: true,
    },
    distance: {
      type: Number,
      required: false,
    },
  },
  methods: {},
}
</script>

<style lang="sass" scoped></style>
