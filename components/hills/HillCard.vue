<template>
  <div class="relative bg-lightgrey" :class="hillCardTheme">
    <div class="p-2">
      <nuxt-link
        :to="{ name: 'hills-id', params: { id: hill.id } }"
        class="flex justify-between items-center mb-2"
      >
        <h2 class="text-xl">{{ hill.name }}</h2>
        <AreaIcon :hill="hill" />
      </nuxt-link>

      <div v-if="hillDetails" class="flex justify-between items-align">
        <HeightRating
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
        ></HeightRating>
        {{ hill.height_m }}m
      </div>

      <div v-if="currentUserId" class="flex pt-2 justify-end items-align">
        <BagItButton
          :hill-id="hill.id"
          :area-class-name="hill.areaClassName"
          :hasBagged="hasBagged"
        />
      </div>
    </div>
    <div
      v-if="hasBagged"
      class="z-10 text-grey font-bold text-5xl uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-12"
    >
      Bagged
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AreaIcon from '@/components/hills/AreaIcon.vue'
import HeightRating from '@/components/hills/HeightRating.vue'
import BagItButton from '@/components/user/BagItButton.vue'
export default {
  components: {
    HeightRating,
    AreaIcon,
    BagItButton,
  },
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hillDetails: {
      type: Boolean,
      required: false,
      default: true,
    },
    bagDetails: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    ...mapState({
      hillsBagged: (state) => state.users.user.hillsBagged,
      currentUserId: (state) => state.users.currentUserId,
    }),
    hasBagged() {
      return this.hillsBagged.includes(this.hill.id)
    },
    hillCardTheme() {
      return this.hasBagged ? 'HillCard--bagged' : 'HillCard--unbagged'
    },
  },
}
</script>

<style lang="scss" scoped>
// .HillCard--bagged {
//   @apply bg-darkgrey text-white;
// }
// .HillCard--unbagged {
//   @apply bg-lightgrey;
// }
</style>
