<template>
  <div>
    <HillList />
    <!-- <nuxt-link
      v-if="currentUserId !== ''"
      to="/hills/list"
      class="bg-southern text-white button"
      >Bag a fell</nuxt-link
    >
    <nuxt-link
      v-if="currentUserId === ''"
      to="/user/login"
      class="bg-southern text-white button"
      >Start bagging Wainwrights</nuxt-link
    >
    <BaseCard theme="southern">
      <template v-slot:header>Bag a fell</template>
    </BaseCard>
    <BaseCard theme="northern">
      <template v-slot:header>Collect badges</template>
    </BaseCard>
    <BaseCard theme="eastern">
      <template v-slot:header>View your stats</template>
    </BaseCard> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import HillList from '@/components/hills/HillList.vue'

export default {
  components: {
    HillList,
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
    }),
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Fell baggr')
  },
}
</script>

<style lang="scss" scoped>
img.bg {
  /* Set rules to fill background */
  min-height: 100%;
  min-width: 800px;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;
  top: 0;
  bottom: auto;
  left: 0;
}
@media screen and (max-width: 800px) {
  /* Specific to this particular image */
  img.bg {
    top: auto;
    bottom: -100px;
    left: 0;
    // left: 50%;
    // margin-left: -400px; /* 50% */
  }
}
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
