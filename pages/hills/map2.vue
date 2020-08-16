<template>
  <div>
    <h3>Bing Map</h3>
    <div ref="bingMap" class="w-full h-64"></div>
  </div>
</template>

<script>
import bingMapsInit from '@/utils/bingMaps.js'
export default {
  async mounted() {
    try {
      const Microsoft = await bingMapsInit()

      // const geocoder = new google.maps.Geocoder()
      // const map = new google.maps.Map(this.$el)
      let map = new Microsoft.Maps.Map(this.$refs.bingMap, {})

      //   geocoder.geocode({ address: 'Austria' }, (results, status) => {
      //     if (status !== 'OK' || !results[0]) {
      //       throw new Error(status)
      //     }

      //     map.setCenter(results[0].geometry.location)
      //     map.fitBounds(results[0].geometry.viewport)
      //   })
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style lang="scss" scoped></style>
