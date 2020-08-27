<template>
  <div class="mb-4">
    <div ref="bingMap" class="w-full h-64 bg-lightgrey p-2">Loading map</div>
  </div>
</template>

<script>
// see https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/
import bingMapsInit from '@/utils/bingMaps.js'
import { theme } from '~tailwind.config'

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
      var center = map.getCenter()

      //Create custom Pushpin
      var pin = new Microsoft.Maps.Pushpin(center, {
        title: this.hill.name,
        text: this.hill.area,
        color: theme.colors[this.hill.areaClassName].default,
      })

      map.entities.push(pin)
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style lang="scss" scoped></style>
