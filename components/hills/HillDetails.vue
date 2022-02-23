<template>
  <div class="bg-grey-darkest text-white rounded-md flow p-2">
    <!-- <h3 class="sr-only">Statistics</h3> -->
    <div class="flex flex-row justify-between items-center">
      <HillsHeightRating
        :height-rating="hill.heightRating"
        :area-class-name="hill.areaClassName"
        :height="hill.height_m"
        :show-height="true"
      />
      <HillsAreaIcon :hill="hill" />
    </div>
    <div class="flex gap-2 flex-wrap justify-between items-center">
      <span>OS ref: {{ hill.os_grid_ref }}</span>
      <span>OS map: {{ hill.os_map }}</span>
    </div>
    <div class="flex gap-2 flex-wrap justify-between items-center">
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
