<template>
  <div>
    <BasePageTitle>Hills list</BasePageTitle>
    <div class="flex flex-wrap">
      <HillCard v-for="hill in hills" :key="hill.rank" :hill="hill" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//  import json from '@/static/wainwrights.json'
import HillCard from '@/components/HillCard.vue'

export default {
  components: {
    HillCard,
  },
  computed: mapState({ hills: (state) => state.hills.hills }),
  created() {
    this.$store.dispatch('hills/fetchHills')
  },
}
</script>
