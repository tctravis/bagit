<template>
  <div>
    <div class="bg-lightgrey rounded p-2 mb-2">
      <h3 class="sr-only">Statistics</h3>
      <p class="text-lg">Wainwright #{{ hill.id }}</p>
      <div class="flex flex-row justify-between items-center mb-2">
        <HeightRating
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
        />
        <p><span class="sr-only">Altitude: </span>{{ hill.height_m }}m</p>
      </div>

      <div class="flex flex-row justify-end items-center">
        <nuxt-link :to="{ name: 'hills-id', params: { id: hill.id } }">
          <BaseButton :button-class="'bg-' + hill.areaClassName"
            >More details</BaseButton
          >
        </nuxt-link>
        <BaseButton
          class="ml-2"
          :button-class="'bg-' + hill.areaClassName"
          :disabled="hasBagged"
          @click="bagThis"
          ><template v-if="!hasBagged">Bag it!</template
          ><template v-if="hasBagged">Bagged</template></BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    distance: {
      type: Number,
      required: false,
    },
  },
  computed: {
    hasBagged() {
      return this.hillsBagged.includes(this.hill.id)
    },
  },
  methods: {
    ...mapActions('users', ['toggleBagModal', 'setHillToBag']),
    bagThis() {
      this.setHillToBag(this.hill.id)
      this.toggleBagModal()
    },
  },
}
</script>

<style lang="sass" scoped></style>
