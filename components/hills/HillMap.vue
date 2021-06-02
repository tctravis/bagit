<template>
  <div class="mb-4">
    <div
      ref="bingMap"
      class="w-full flex items-center justify-center h-64 md:h-80 lg:h-30rem bg-lightgrey p-2"
    >
      <p>{{ loadingMessage }}</p>
    </div>
  </div>
</template>

<script>
// see https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/
import bingMapsInit from '@/utils/bingMaps.js'
import { theme } from '~tailwind.config'
import { mapState } from 'vuex'
import calculateDistances from '@/mixins/calculateDistances.js'

export default {
  mixins: [calculateDistances],
  props: {
    hill: {
      type: Object,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    ...mapState({
      hills: (state) => state.hills.hills,
    }),
    nearbyHills() {
      // see mixins : calculateDistances: move into state for each hill
      return this.findDistancesFromLoc(this.hill, this.hills, this.limit)
    },
    loadingMessage() {
      return this.$nuxt.isOnline
        ? 'Loading map...'
        : 'An internet connection is required to view maps'
    },
  },
  methods: {
    async loadMap() {
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
        let pin = new Microsoft.Maps.Pushpin(center, {
          title: this.hill.name,
          // text: this.hill.area,
          color: theme.colors[this.hill.areaClassName].default,
        })
        map.entities.push(pin)

        this.nearbyHills.forEach((hill) => {
          // let hillObj = hill.hill
          let hillLoc = new Microsoft.Maps.Location(hill.lat, hill.lng)
          let pin = new Microsoft.Maps.Pushpin(hillLoc, {
            title: hill.name,
            color: theme.colors[hill.areaClassName].default,
          })
          map.entities.push(pin)
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
  mounted() {
    if (this.$nuxt.isOnline) {
      this.loadMap()
    }
  },
}
</script>

<style lang="scss" scoped></style>
