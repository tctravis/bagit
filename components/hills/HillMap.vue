<template>
  <div>
    <h3>Map</h3>
    <div ref="bingMap" class="w-full h-64"></div>
  </div>
</template>

<script>
// see https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/
import bingMapsInit from '@/utils/bingMaps.js'
export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    try {
      const Microsoft = await bingMapsInit()
      let map = new Microsoft.Maps.Map(this.$refs.bingMap, {
        center: new Microsoft.Maps.Location(this.hill.lat, this.hill.lng),
        mapTypeId: Microsoft.Maps.MapTypeId.ordnanceSurvey,
        zoom: 13,
        showLocateMeButton: false,
        showMapTypeSelector: false,
        maxZoom: 16,
        minZoom: 9,
      })
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style lang="scss" scoped></style>
