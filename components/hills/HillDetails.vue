<template>
  <div>
    <div class="bg-lightgrey rounded p-2 mb-2">
      <h3 class="sr-only">Statistics</h3>
      <HeightRating
        :height-rating="hill.heightRating"
        :area-class-name="hill.areaClassName"
      />
      <p>Altitude: {{ hill.height_m }}m (in feet)</p>
      <p>Prominence: {{ hill.prom_m }}m (in feet)</p>
    </div>
    <div class="bg-lightgrey rounded p-2 mb-2">
      <h3 class="sr-only">Location</h3>
      <div class="flex flex-row justify-between items-center">
        <p>OS grid ref: {{ hill.os_grid_ref }}</p>
        <p>OS map: {{ hill.os_map }}</p>
      </div>
    </div>
    <div class="bg-lightgrey rounded p-2 mb-2">
      <div class="flex flex-row justify-between items-center">
        <nuxt-link :to="{ name: 'hills-id', params: { id: hill.id } }">
          More details about {{ hill.name }}
        </nuxt-link>
        <BaseButton
          class="ml-auto"
          :button-class="'bg-' + hill.areaClassName"
          :disabled="this.$fireAuth.currentUser === null || hasBagged"
          @click="openBagItModal"
          ><template v-if="!hasBagged">Bag it!</template
          ><template v-if="hasBagged">Bagged already</template></BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import HeightRating from '@/components/hills/HeightRating.vue'
export default {
  components: {
    HeightRating,
  },
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hillsBagged: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasBagged() {
      return this.hillsBagged.includes(this.hill.id)
    },
  },
  methods: {
    openBagItModal() {
      this.$root.$emit('openModal', this.hill.id)
    },
  },
}
</script>

<style lang="sass" scoped></style>
