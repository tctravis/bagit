<template>
  <div class="container py-4">
    <BasePageTitle
      ><template #title>{{ hill.name }}</template></BasePageTitle
    >

    <BagItButton :hill-id="hill.id" :theme="hill.areaClassName" />
    <div class="grid grid-cols-12 gap-4">
      <div class="grid grid-cols-12 gap-4 col-span-12">
        <div class="col-span-12 md:col-span-4">
          <HasBaggedNotice
            v-if="hasBagged"
            class="mb-4"
            :theme="hill.areaClassName"
            :hill-name="hill.name"
          />
          <HillDetails :hill="hill" />

          <BaseInfoBar class="flow">
            <div class="flex flex-row items-center justify-between">
              <span>OS ref: {{ hill.os_grid_ref }}</span>
              <span>OS map: {{ hill.os_map }}</span>
            </div>
            <div class="flex flex-row items-center justify-between">
              <BaseButton
                v-show="mapType === 'aerial'"
                class="ml-auto"
                button-class="bg-southern"
                @click="setMapType('ordnanceSurvey')"
                >Load OS map view</BaseButton
              >
              <BaseButton
                v-show="mapType === 'ordnanceSurvey'"
                class="ml-auto"
                button-class="bg-southern"
                @click="setMapType('aerial')"
                >Load aerial view</BaseButton
              >
            </div>
          </BaseInfoBar>
        </div>
        <div class="col-span-12 md:col-span-8">
          <HillMap :hill="hill" :limit="nearbyHillsLimit" :map-type="mapType" />
        </div>
      </div>
      <div class="col-span-12">
        <div class="flex flex-row items-center justify-between">
          <BaseTitle
            :level="2"
            :has-decoration="true"
            :theme="hill.areaClassName"
            >Nearby Fells</BaseTitle
          >
          <BaseButton @click="loadMoreNearbyHills">Load more fells</BaseButton>
        </div>

        <NearbyHillsList :hill="hill" :limit="nearbyHillsLimit" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import BagItButton from '@/components/user/BagItButton.vue'
import HillDetails from '@/components/hills/HillDetails.vue'
// import HillPageTitle from '@/components/hills/HillPageTitle.vue'
// import HeightRating from '@/components/hills/HeightRating.vue'
import HillMap from '@/components/hills/HillMap.vue'
import NearbyHillsList from '@/components/hills/NearbyHillsList.vue'
import HasBaggedNotice from '@/components/user/HasBaggedNotice.vue'

export default {
  components: {
    BagItButton,
    // HeightRating,
    // HillPageTitle,
    HillDetails,
    HillMap,
    NearbyHillsList,
    HasBaggedNotice,
  },
  data() {
    return {
      mapType: 'aerial',
      baseHillsLimit: 12,
      nearbyHillsLimit: 12,
    }
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
    setMapType(mapType) {
      this.mapType = mapType
    },
    loadMoreNearbyHills() {
      this.nearbyHillsLimit =
        parseInt(this.nearbyHillsLimit) + parseInt(this.baseHillsLimit)
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', this.hill.name)
    this.$store.dispatch('pages/setPageTheme', this.hill.areaClassName)
  },
}
</script>
