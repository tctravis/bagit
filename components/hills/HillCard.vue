<template>
  <div class="bg-grey-darkest text-white rounded-md" :class="hillCardTheme">
    <div class="p-2 relative">
      <div
        v-if="hasBagged"
        class="rounded-md bg-gradient-to-b from-grey-darkest to-darkgrey bg-opacity-75 absolute inset-0 flex items-center justify-center"
      />

      <div class="flex relative items-center mb-2">
        <nuxt-link
          :to="{ name: 'hills-id', params: { id: hill.id } }"
          class="flex relative items-center mb-2"
        >
          <h2
            class="relative z-20 text-xl hover:underline"
            :class="hasBagged ? 'text-midgrey' : 'text-white'"
          >
            {{ hill.name }}
          </h2>
        </nuxt-link>
        <HillsAreaIcon class="ml-auto" :hill="hill" :has-bagged="hasBagged" />
      </div>

      <div v-if="hillDetails" class="flex justify-between items-align">
        <HillsHeightRating
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
          :height="hill.height_m"
          :show-height="hasBagged ? false : true"
          :has-bagged="hasBagged ? true : false"
          class="relative z-20"
        ></HillsHeightRating>

        <UserBagItButton
          v-if="currentUserId"
          :hill-id="hill.id"
          :theme="hill.areaClassName"
          class="ml-auto relative z-20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hillDetails: {
      type: Boolean,
      default: true,
    },
    bagDetails: {
      type: Boolean,
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

<style lang="scss" scoped></style>
