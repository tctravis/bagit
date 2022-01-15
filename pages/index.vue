<template>
  <div class="flow">
    <BaseHero>
      <template #title>Start bagging Lake District fells today</template>
      <template #strapline>
        Use this app to help plan and record your adventures bagging the Lake
        District fells.</template
      >
      <template #actions>
        <nuxt-link to="/hills">Find a fell to bag</nuxt-link>
      </template>
    </BaseHero>
    <div class="container">
      <BaseCardGrid :max-cards-per-row="3">
        <BaseCard>
          <template #title>Find fells to bag</template>
          <template #text
            >Browse a list of the 240 Lake District fells featured in Alfred
            Wainwright's classic guides</template
          >
        </BaseCard>
        <BaseCard>
          <template #title>Record your bags</template>
          <template #text
            >Create an account to record the fells you've bagged</template
          >
        </BaseCard>
        <BaseCard>
          <template #title>Track your progress</template>
          <template #text
            >View charts and graphs celebrating your bagging
            acheivements</template
          >
        </BaseCard>
      </BaseCardGrid>
    </div>
    <div class="container">
      <BaseCardGrid :max-cards-per-row="3">
        <BaseCard theme="northern">
          <template #title>What are fells?</template>
          <template #text
            >A fell (from Old Norse fell, fjall, "mountain") is a high and
            barren landscape feature, such as a mountain or moor-covered
            hill.</template
          >
        </BaseCard>
        <BaseCard>
          <template #title>What is fell bagging?</template>
          <template #text
            >Peak, hill or fell bagging is an activity in which hikers,
            climbers, and mountaineers attempt to reach a collection of summits,
            published in the form of a list.</template
          >
        </BaseCard>
        <BaseCard>
          <template #title>What is a Wainwright?</template>
          <template #text
            >The Wainwrights are mountains or hills (locally known as fells) in
            the English Lake District National Park that have a chapter in one
            of Alfred Wainwright's Pictorial Guides to the Lakeland
            Fells.</template
          >
        </BaseCard>
      </BaseCardGrid>
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Fell Baggr')
    this.$store.dispatch('pages/setPageTheme', 'primary')
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
