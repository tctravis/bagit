<template>
  <div class="bg-grey-darkest text-white rounded-lg">
    <div class="flex flex-row items-center justify-between p-4">
      <h2>Hill Map</h2>
    </div>
    <div
      ref="bingMap"
      class="w-full z-1 flex items-center justify-center h-64 md:h-80 lg:h-30rem"
    >
      <!-- <p>{{ loadingMessage }}</p> -->
      <template v-if="$nuxt.isOnline">
        <BaseButton @click="loadMap"
          ><template #text>Load map</template></BaseButton
        >
      </template>
      <template v-else>
        <p>You need an internet connection to use the map</p>
      </template>
    </div>
    <div class="flex flex-row items-center justify-between p-4">
      <BaseButton
        v-show="mapType === 'aerial'"
        class="ml-auto"
        theme="grey-dark"
        @click="setMapType('ordnanceSurvey')"
        ><template #text>Load OS map view</template></BaseButton
      >
      <BaseButton
        v-show="mapType === 'ordnanceSurvey'"
        class="ml-auto"
        theme="grey-dark"
        @click="setMapType('aerial')"
        ><template #text>Load aerial view</template></BaseButton
      >
    </div>
  </div>
</template>

<script>
// see https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/
import { bingMapsInit } from '@/plugins/bing-maps.js'

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
    theme: {
      type: String,
      default: 'southern',
    },
  },
  data() {
    return {
      map: null,
      mapType: 'aerial',
    }
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
  watch: {
    mapType() {
      console.log('map type')
      if (!Microsoft && this.map) return false
      this.map.setView({
        mapTypeId: Microsoft.Maps.MapTypeId[this.mapType],
      })
    },
  },
  mounted() {
    this.loadMap()
  },
  methods: {
    loadMap() {
      bingMapsInit.then(() => {
        this.populateMap()
      })
    },
    populateMap() {
      const hillMap = this

      if (!Microsoft) return false
      this.map = new Microsoft.Maps.Map(this.$refs.bingMap, {
        center: new Microsoft.Maps.Location(this.hill.lat, this.hill.lng),
        mapTypeId: Microsoft.Maps.MapTypeId[hillMap.mapType],
        // ordnanceSurvey
        zoom: 12,
        showLocateMeButton: false,
        showMapTypeSelector: false,
        maxZoom: 16,
        minZoom: 9,
      })
      var center = this.map.getCenter()

      let pinColor = this.$utilities.getThemeColor(this.hill.areaClassName)

      //Create custom Pushpin
      let pin = new Microsoft.Maps.Pushpin(center, {
        title: this.hill.name,
        // icon: '/icons/mountain.svg',
        // text: this.hill.area,
        icon: '<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_113_40)"><path d="M11.5 0L23.1913 20.25H-0.191345L11.5 0Z" fill="{color}"/><path d="M11.5 4L16.2631 12.25H6.73686L11.5 4Z" fill="white"/><path d="M9.5 10L14.2631 18.25H4.73686L9.5 10Z" fill="{color}"/></g><defs><clipPath id="clip0_113_40"><rect width="23" height="20" fill="white"/></clipPath></defs></svg>',
        color: pinColor,
      })
      this.map.entities.push(pin)

      this.nearbyHills.forEach((hill) => {
        let pinColor = this.$utilities.getThemeColor(hill.areaClassName)
        // let hillObj = hill.hill
        let hillLoc = new Microsoft.Maps.Location(hill.lat, hill.lng)
        let pin = new Microsoft.Maps.Pushpin(hillLoc, {
          title: hill.name,
          icon: '<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_113_40)"><path d="M11.5 0L23.1913 20.25H-0.191345L11.5 0Z" fill="{color}"/><path d="M11.5 4L16.2631 12.25H6.73686L11.5 4Z" fill="white"/><path d="M9.5 10L14.2631 18.25H4.73686L9.5 10Z" fill="{color}"/></g><defs><clipPath id="clip0_113_40"><rect width="23" height="20" fill="white"/></clipPath></defs></svg>',
          color: pinColor,
        })
        this.map.entities.push(pin)

        Microsoft.Maps.Events.addHandler(pin, 'click', function () {
          hillMap.goToHillPage(hill.id)
        })
      })
    },
    goToHillPage(hillId) {
      this.$router.push({
        path: '/hills/' + hillId,
        // path: '/',
      })
    },
    setMapType(mapType) {
      this.mapType = mapType
    },
  },
}
</script>

<style lang="scss" scoped></style>
