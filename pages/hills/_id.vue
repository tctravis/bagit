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
    <BaseButton button-class="bg-southern">Bagged it!</BaseButton>
    <HeightRating
      :heightRating="hill.heightRating"
      :areaClassName="hill.areaClassName"
    />
    <HillCard :hill="hill" :hills-climbed="user.hillsClimbed" />
    <h2 class="text-xl">Nearby Wainwrights</h2>
    <h2 class="text-xl">Routes</h2>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HillCard from '@/components/HillCard.vue'
import HeightRating from '@/components/HeightRating.vue'
import AreaIcon from '@/components/AreaIcon.vue'

export default {
  components: {
    HillCard,
    HeightRating,
    AreaIcon,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
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
