<template>
  <div>
    <div class="grid grid-cols-12 gap-4">
      <div class="grid grid-cols-12 gap-4 col-span-12">
        <div class="col-span-12 md:col-span-4">
          <HillCard :hill="hill" class="mb-4" />
          <BaseInfoBar>
            <div class="flex flex-row items-center justify-between mb-2">
              <p class="text-lg">Wainwright #{{ hill.id }}</p>
              <p>Prominence: {{ hill.prom_m }}m</p>
            </div>
          </BaseInfoBar>
        </div>
        <div class="col-span-12 md:col-span-8">
          <HillMap :hill="hill" :limit="12" />
          <BaseInfoBar class="flex flex-row items-center justify-between">
            <span>OS ref: {{ hill.os_grid_ref }}</span>
            <span>OS map: {{ hill.os_map }}</span>
          </BaseInfoBar>
        </div>
      </div>
      <div class="col-span-12">
        <BaseTitle :level="2" :has-decoration="true" :theme="hill.areaClassName"
          >Nearby Hills</BaseTitle
        >
        <NearbyHillsList :hill="hill" :limit="12" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import HillCard from '@/components/hills/HillCard.vue'
import HillPageTitle from '@/components/hills/HillPageTitle.vue'
import HeightRating from '@/components/hills/HeightRating.vue'
import HillMap from '@/components/hills/HillMap.vue'
import NearbyHillsList from '@/components/hills/NearbyHillsList.vue'

export default {
  components: {
    HeightRating,
    HillPageTitle,
    HillCard,
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', this.hill.name)
    this.$store.dispatch('pages/setPageTheme', this.hill.areaClassName)
  },
}
</script>
