<template>
  <div class="flow bg-grey-darkest text-white rounded-md p-4">
    <!-- <h3 class="sr-only">Statistics</h3> -->
    <div class="flex flex-row justify-between items-center mb-2">
      <HillsHeightRating
        :height-rating="hill.heightRating"
        :area-class-name="hill.areaClassName"
        :height="hill.height_m"
        :show-height="true"
      />
      <HillsAreaIcon :hill="hill" />
    </div>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center">
      <span>OS ref: {{ hill.os_grid_ref }}</span>
      <span>OS map: {{ hill.os_map }}</span>
    </div>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center">
      <!-- <p>Prominence: {{ hill.prom_m }}m</p> -->
      <UserBagItButton
        class="ml-auto"
        :hill-id="hill.id"
        :theme="hill.areaClassName"
      />
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
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
