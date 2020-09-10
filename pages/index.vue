<template>
  <div>
    <img src="~assets/img/hiker.jpg" class="bg z-0" />
    <div
      class="absolute top-0 left-0 right-0 bottom-0 p-4 z-10 h-screen flex flex-col items-start justify-center"
    >
      <BasePageTitle class="text-white">
        <template v-slot:title>Fell Baggr</template>
      </BasePageTitle>

      <BaseParagraph class="text-white">
        Use this app to help plan and record your adventures bagging the Lake
        District fells.
      </BaseParagraph>

      <BaseParagraph class="text-white">
        Based on the Wainwrights, the list of fells described in the classic
        guides by A.W. Wainwright
      </BaseParagraph>

      <nuxt-link
        v-if="currentUserId !== ''"
        to="/hills/list"
        class="bg-southern text-white button"
        >Bag a fel</nuxt-link
      >
      <nuxt-link
        v-if="currentUserId === ''"
        to="/user/login"
        class="bg-southern text-white button"
        >Start bagging Wainwrights</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
