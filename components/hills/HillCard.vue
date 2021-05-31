<template>
  <div class="bg-lightgrey" :class="hillCardTheme">
    <div class="p-2 relative">
      <div
        v-if="hasBagged"
        class="z-10 bg-black bg-opacity-75 absolute inset-0 flex items-center justify-center"
      >
        <p class="hidden text-grey font-bold text-4xl uppercase">
          <font-awesome-icon :icon="['fa', 'hiking']" /><span class="sr-only"
            >Bagged</span
          >
        </p>
      </div>

      <div class="flex relative items-center mb-2">
        <nuxt-link
          :to="{ name: 'hills-id', params: { id: hill.id } }"
          class="flex relative items-center mb-2"
        >
          <h2
            class="relative z-20 text-xl hover:underline"
            :class="hasBagged ? 'text-white' : 'text-black'"
          >
            {{ hill.name }}
          </h2>
        </nuxt-link>
        <AreaIcon class="ml-auto" :hill="hill" />
      </div>

      <div v-if="hillDetails" class="flex justify-between items-align">
        <HeightRating
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
          :height="hill.height_m"
          :show-height="true"
        ></HeightRating>

        <BagItButton
          v-if="currentUserId"
          :hill-id="hill.id"
          :area-class-name="hill.areaClassName"
          class="ml-auto relative z-20"
        />
      </div>
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
