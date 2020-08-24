<template>
  <div>
    <HillPageTitle :hill="hill" :hills-bagged="hillsBagged">{{
      hill.name
    }}</HillPageTitle>

    <div class="mb-4 p-4 bg-lightgrey rounded">
      <p class="text-lg mb-2">Wainwright #{{ hill.id }}</p>
      <div class="mb-2">
        <HeightRating
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
        />
      </div>
      <div class="xsm:flex xsm:flex-row xsm:justify-between mb-2">
        <p>Altitude: {{ hill.height_m }}m</p>
        <p>Prominence: {{ hill.prom_m }}m</p>
      </div>
      <div class="xsm:flex xsm:flex-row xsm:justify-between mb-2">
        <p>OS grid ref: {{ hill.os_grid_ref }}</p>
        <p>OS map #: {{ hill.os_map }}</p>
      </div>
    </div>
    <HillMap :hill="hill" />
    <NearbyHillsList :hill="hill" />

    <BagCreateModal />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import HillPageTitle from '@/components/hills/HillPageTitle.vue'
import HeightRating from '@/components/hills/HeightRating.vue'
import BagCreateModal from '@/components/user/BagCreateModal.vue'
import HillMap from '@/components/hills/HillMap.vue'
import NearbyHillsList from '@/components/hills/NearbyHillsList.vue'

export default {
  components: {
    HeightRating,
    HillPageTitle,
    BagCreateModal,
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
