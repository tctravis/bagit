<template>
  <div>
    <BasePageTitle><template v-slot:title>Statistics</template></BasePageTitle>
    <BaseInfoBar>
      {{ user.userName }}, you have bagged {{ totalBagged }} of
      {{ totalHills }} Wainwrights
    </BaseInfoBar>
    <BaseTitle :level="2" :has-decoration="true" class="text-xl"
      >Bagged by area</BaseTitle
    >
    <ChartBaggedByArea />
    <BaseTitle :level="2" :has-decoration="true" class="text-xl"
      >Altitude</BaseTitle
    >
    <BaseInfoBar>
      <p>
        Altitude bagged:
        <span>{{ getTotalAltClimbed }}m</span>
      </p>
      <TooltipInfo>
        <BaseParagraph>
          'Altitude bagged' is calculated using the prominence (rather than the
          altitude) of all the Wainwrights you have bagged.
        </BaseParagraph>
      </TooltipInfo>
    </BaseInfoBar>
    <BaseParagraph>
      Sed consectetur eros metus, a maximus urna pulvinar a. Nunc luctus
      molestie ante, ut tristique mauris ultrices in. Ut venenatis ex justo, at
      lobortis eros auctor eget.
    </BaseParagraph>
    <ChartAltitudeLine v-if="user.bags.length > 0" class="mb-6" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import BaggingBadges from '@/components/user/BaggingBadges.vue'
import ChartBaggedByArea from '@/components/user/ChartBaggedByArea.vue'
import ChartAltitudeLine from '@/components/user/ChartAltitudeLine.vue'
import TooltipInfo from '@/components/widgets/TooltipInfo.vue'
export default {
  components: {
    // BaggingBadges,
    ChartBaggedByArea,
    ChartAltitudeLine,
    TooltipInfo,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUser: (state) => state.users.currentUser,
      hills: (state) => state.hills.hills,
    }),
    ...mapGetters('users', ['getTotalAltClimbed']),
    totalBagged() {
      return this.user.bags.length
    },
    totalHills() {
      return this.hills.length
    },
  },
}
</script>

<style lang="scss" scoped></style>
