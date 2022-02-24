<template>
  <LayoutPageWrapper>
    <template #header>
      <BasePageTitle
        ><template #title>{{ hill.name }}</template></BasePageTitle
      >
    </template>
    <template #main>
      <div class="grid grid-cols-12 gap-4">
        <div class="grid grid-cols-12 gap-4 col-span-12">
          <div class="flow col-span-12 md:col-span-5 lg:col-span-4">
            <UserHasBaggedNotice
              v-if="hasBagged"
              class="mb-4"
              :theme="hill.areaClassName"
              :hill-name="hill.name"
            />
            <HillsHillDetails :hill="hill" />
          </div>
          <div class="col-span-12 md:col-span-7 lg:col-span-8">
            <HillsHillMap
              :theme="hill.areaClassName"
              :hill="hill"
              :limit="nearbyHillsLimit"
              :map-type="mapType"
            />
          </div>
        </div>
        <div class="flow col-span-12">
          <div class="flex flex-row items-center justify-between">
            <BaseTitle
              :level="2"
              :has-decoration="true"
              :theme="hill.areaClassName"
              :custom-classes="['text-white']"
              >Nearby Fells</BaseTitle
            >
            <!-- <BaseButton @click="loadMoreNearbyHills"
              ><template #text>Load more fells</template></BaseButton
            > -->
          </div>

          <HillsNearbyHillsList :hill="hill" :limit="nearbyHillsLimit" />
        </div>
      </div>
    </template>
  </LayoutPageWrapper>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      mapType: 'aerial',
      baseHillsLimit: 18,
      nearbyHillsLimit: 18,
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
    // setMapType(mapType) {
    //   this.mapType = mapType
    // },
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
