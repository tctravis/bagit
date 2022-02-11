<template>
  <div class="flow bg-darkdarkgrey text-white rounded-md p-4">
    <!-- <h3 class="sr-only">Statistics</h3> -->
    <div class="flex flex-row justify-between items-center mb-2">
      <HeightRating
        :height-rating="hill.heightRating"
        :area-class-name="hill.areaClassName"
        :height="hill.height_m"
        :show-height="true"
      />
      <AreaIcon :hill="hill" />
    </div>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center">
      <span>OS ref: {{ hill.os_grid_ref }}</span>
      <span>OS map: {{ hill.os_map }}</span>
    </div>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center">
      <!-- <p>Prominence: {{ hill.prom_m }}m</p> -->
      <BagItButton
        class="ml-auto"
        :hill-id="hill.id"
        :theme="hill.areaClassName"
      />
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
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
  },
  methods: {},
}
</script>

<style lang="sass" scoped></style>
