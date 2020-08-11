<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>{{ hill.name }}</template>
      <template v-slot:icon>
        <AreaIcon
          :area="hill.area"
          :class="
            ('bg-' + hill.areaName) | removeSpaces | lowercase
          " /></template
    ></BasePageTitle>

    <div class="mb-4 p-4 bg-lightgrey rounded">
      <div class="mb-2">
        <span>Wainwright #{{ hill.id }}</span>
      </div>
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
    <div class="flex flex-row justify-end">
      <BaseButton
        :button-class="'bg-' + hill.areaClassName"
        fa-icon-class="shoe-prints"
        @click="$refs.modalName.openModal()"
        :disabled="currentUserId === '' || currentUserId === undefined"
        >Bag it!</BaseButton
      >
    </div>

    <BaseModal ref="modalName">
      <template v-slot:header>
        <h1>Bag it!</h1>
      </template>

      <template v-slot:body>
        <BagCreate :hill="hill" />
      </template>

      <template v-slot:footer> </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HeightRating from '@/components/hills/HeightRating.vue'
import AreaIcon from '@/components/hills/AreaIcon.vue'
import BagCreate from '@/components/BagCreate.vue'

export default {
  components: {
    HeightRating,
    AreaIcon,
    BagCreate,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUserId: (state) => state.users.currentUserId,
    }),
    ...mapGetters('hills', ['getHillById']),
    hill() {
      return this.getHillById(this.hillId)
    },
    hillId() {
      return this.$route.params.id
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
