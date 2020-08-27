<template>
  <div>
    <HillPageTitle :hill="hill" :hills-bagged="hillsBagged">{{
      hill.name
    }}</HillPageTitle>

    <BaseInfoBar>
      <div class="xsm:flex flex-row items-center justify-between xsm:mb-2">
        <p class="mb-2 xsm:mb-0">Wainwright #{{ hill.id }}</p>
        <HeightRating
          class="mb-2 xsm:mb-0"
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
        />
      </div>

      <div class="flex flex-row items-center justify-between">
        <p>Altitude: {{ hill.height_m }}m</p>
        <p>Prominence: {{ hill.prom_m }}m</p>
      </div>
    </BaseInfoBar>
    <BaseTitle :level="2" :hasDecoration="true">Map</BaseTitle>
    <BaseInfoBar class="flex flex-row items-center justify-between">
      <span>OS ref: {{ hill.os_grid_ref }}</span>
      <span>OS map: {{ hill.os_map }}</span>
    </BaseInfoBar>
    <HillMap :hill="hill" />
    <BaseTitle :level="2" :hasDecoration="true">Nearby Hills</BaseTitle>
    <NearbyHillsList :hill="hill" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import HillPageTitle from '@/components/hills/HillPageTitle.vue'
import HeightRating from '@/components/hills/HeightRating.vue'
import HillMap from '@/components/hills/HillMap.vue'
import NearbyHillsList from '@/components/hills/NearbyHillsList.vue'

export default {
  components: {
    HeightRating,
    HillPageTitle,
    HillMap,
    NearbyHillsList,
  },
  computed: {
    apikey() {
      return process.env.bingMapsApiKey
    },
    ...mapState({
      hillsBagged: (state) => state.users.user.hillsBagged,
    }),
    ...mapGetters('hills', ['getHillById']),
    hill() {
      return this.getHillById(this.hillId)
    },
    hillId() {
      return this.$route.params.id
    },
    hasBagged() {
      let hasBagged = false
      if (this.hillsBagged.includes(this.hillId)) {
        hasBagged = true
      }
      return hasBagged
    },
  },
  methods: {
    ...mapActions('users', ['toggleBagModal', 'setHillToBag']),
    bagThis() {
      this.setHillToBag(this.hillId)
      this.toggleBagModal()
    },
  },
  head() {
    return {
      title: 'Hill #' + this.hill.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Details about hill' + this.hill.id,
        },
      ],
    }
  },
}
</script>
