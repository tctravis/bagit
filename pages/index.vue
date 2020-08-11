<template>
  <div class="test bg-fixed">
    <img src="~assets/img/hiker.jpg" class="bg z-0" />
    <div
      class="absolute top-0 left-0 right-0 bottom-0 p-4 z-10 h-screen flex flex-col items-center text-center justify-center"
    >
      <BasePageTitle class="text-white"
        ><template v-slot:title
          >Which fell are you bagging today?</template
        ></BasePageTitle
      >
      <nuxt-link
        v-if="currentUserId !== ''"
        to="/user/dashboard"
        class="inline-block mb-4 p-2 bg-eastern text-darkgrey rounded"
        >View your progress</nuxt-link
      >
      <nuxt-link
        to="/hills/list"
        class="inline-block p-2 bg-western text-white rounded"
        >Choose a fell to bag</nuxt-link
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
