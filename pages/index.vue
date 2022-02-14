<template>
  <div>
    <header class="home-hero flex flex-col items-center text-center">
      <div class="home-hero-title-wrapper w-full pt-6">
        <BaseTitle :is-display-font="false" class="text-5xl uppercase font-bold"
          >Fell Baggr</BaseTitle
        >
      </div>
      <div class="container flex pb-6">
        <div class="mx-auto px-4">
          <BaseTitle :level="2" class="text-white text-2xl font-bold">
            Plan and record your adventures on the Lake District
            fells</BaseTitle
          >
        </div>
      </div>
    </header>
    <main class="bg-gradient-to-b from-darkgrey to-black">
      <div class="container py-4">
        <BaseCardGrid :max-cards-per-row="3">
          <CardsCardWithIcon theme="darkgrey-northwestern">
            <template #title>Find a fell to bag</template>
            <template #icon
              ><IconMountain class="h-6 mt-1 fill-northwestern"
            /></template>
            <template #text
              >Browse a list of the 240 Lake District fells featured in Alfred
              Wainwright's classic guides</template
            >
            <template #action
              ><BaseLinkButton link="/hills" theme="northwestern"
                >Find a fell</BaseLinkButton
              ></template
            >
          </CardsCardWithIcon>
          <CardsCardWithIcon theme="darkgrey-eastern">
            <template #title>Record your bags</template>
            <template #icon><IconBackpack class="fill-eastern" /></template>
            <template #text
              >Create an account to record the fells you've bagged</template
            >
            <template #action
              ><BaseLinkButton link="/user/register" theme="eastern"
                >Create an account</BaseLinkButton
              ></template
            >
          </CardsCardWithIcon>
          <CardsCardWithIcon theme="darkgrey-southern">
            <template #title>Track your progress</template>
            <template #icon
              ><IconChart
                class="h-8 mt-1 stroke-southern stroke-2 fill-southern"
            /></template>
            <template #text
              >View charts and graphs celebrating your bagging
              acheivements</template
            >
            <template #action
              ><BaseLinkButton link="/user/register" theme="southern"
                >Create an account</BaseLinkButton
              ></template
            >
          </CardsCardWithIcon>
        </BaseCardGrid>
      </div>
      <div class="container py-4">
        <BaseCardGrid :max-cards-per-row="3">
          <CardsCardWithImage>
            <template #img>
              <BaseImg src="cairn.jpg" />
            </template>
            <template #title>What are fells?</template>
            <template #text
              >A fell (from Old Norse fell, fjall, "mountain") is a high and
              barren landscape feature, such as a mountain or moor-covered
              hill.</template
            >
          </CardsCardWithImage>
          <CardsCardWithImage>
            <template #img>
              <BaseImg src="cairn.jpg" />
            </template>
            <template #title>What is fell bagging?</template>
            <template #text
              >Peak, hill or fell bagging is an activity in which hikers,
              climbers, and mountaineers attempt to reach a collection of
              summits, published in the form of a list.</template
            >
          </CardsCardWithImage>
          <CardsCardWithImage>
            <template #img>
              <BaseImg src="cairn.jpg" />
            </template>
            <template #title>What is a Wainwright?</template>
            <template #text
              >The Wainwrights are mountains or hills (locally known as fells)
              in the English Lake District National Park that have a chapter in
              one of Alfred Wainwright's Pictorial Guides to the Lakeland
              Fells.</template
            >
          </CardsCardWithImage>
        </BaseCardGrid>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import IconMountain from '~/assets/icons/mountain.svg?inline'
import IconBackpack from '~/assets/icons/backpack.svg?inline'
import IconChart from '~/assets/icons/chart.svg?inline'

export default {
  components: {
    IconMountain,
    IconBackpack,
    IconChart,
  },
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
.home-hero {
  .home-hero-title-wrapper {
    min-height: 260px;
    background-image: url(~assets/img/header-bg.svg);
    background-size: 1600px 260px;
    background-position: bottom center;
    background-repeat: no-repeat;
  }
  @screen md {
    min-height: 300px;
  }
}
// img.bg {
//   /* Set rules to fill background */
//   min-height: 100%;
//   min-width: 800px;

//   /* Set up proportionate scaling */
//   width: 100%;
//   height: auto;

//   /* Set up positioning */
//   position: fixed;
//   top: 0;
//   bottom: auto;
//   left: 0;
// }
// @media screen and (max-width: 800px) {
//   /* Specific to this particular image */
//   img.bg {
//     top: auto;
//     bottom: -100px;
//     left: 0;
//     // left: 50%;
//     // margin-left: -400px; /* 50% */
//   }
// }
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
