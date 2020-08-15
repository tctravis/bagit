<template>
  <div>
    <h3>Bing Map</h3>
    <div ref="bingMap" class="w-full h-64"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layerVisible: true,
      mapOptions: {
        zoom: 4,
      },
      pins: [
        {
          key: 'pin1',
          location: {
            latitude: 36.92245,
            longitude: -104.829098,
          },
          options: {
            title: 'pin 1',
            visible: true,
          },
        },
        {
          key: 'pin2',
          location: {
            latitude: 39.950806,
            longitude: -77.77062,
          },
          options: {
            title: 'pin 2',
            visible: true,
          },
        },
      ],
    }
  },
  computed: {
    apikey() {
      return 'Ai8CBYHaITnUQPEWCX9IlJjElli-dxpNb2KGXnwaBL6AmegekcJD1JqHJEBetrlg'
      //return process.env.bingMapsApiKey
    },
  },
  mounted() {
    // let map = new Microsoft.Maps.Map(this.$refs.bingMap, {})
    if (typeof Microsoft === 'undefined') {
      const script = document.createElement('script')
      script.onload = this.onScriptLoaded
      script.type = 'text/javascript'
      script.src =
        'https://www.bing.com/api/maps/mapcontrol?key=Ai8CBYHaITnUQPEWCX9IlJjElli-dxpNb2KGXnwaBL6AmegekcJD1JqHJEBetrlg'
      document.head.appendChild(script)
    } else {
      this.onScriptLoaded()
    }
  },
  methods: {
    onScriptLoaded(event = null) {
      // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      if (event) {
        console.log('Was added')
      } else {
        console.log('Already existed')
      }
      // eslint-disable-next-line
      let map = new Microsoft.Maps.Map(this.$refs.bingMap, {})
    },
  },
  //   head() {
  //     return {
  //       script: [
  //         {
  //           src: 'https://www.bing.com/api/maps/mapcontrol?key=' + this.apikey,
  //           body: true,
  //         },
  //       ],
  //     }
  //   },
}
</script>

<style lang="scss" scoped></style>
