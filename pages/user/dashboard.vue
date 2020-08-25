<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Your progress</template></BasePageTitle
    >
    <BaseTitle :level="2" :hasDecoration="true" class="text-xl"
      >Altitude</BaseTitle
    >
    <div
      class="rounded p-2 bg-lightgrey mb-2 flex flex-row justify-between items-center"
    >
      <p>
        Altitude bagged:
        <span>{{ getTotalAltClimbed }}m</span>
      </p>
      <TooltipInfo>
        <BaseParagraph>
          Nunc luctus molestie ante, ut tristique mauris ultrices in. Ut
          venenatis ex justo, at lobortis eros auctor eget.
        </BaseParagraph>
      </TooltipInfo>
    </div>
    <BaseParagraph>
      Sed consectetur eros metus, a maximus urna pulvinar a. Nunc luctus
      molestie ante, ut tristique mauris ultrices in. Ut venenatis ex justo, at
      lobortis eros auctor eget.
    </BaseParagraph>
    <ChartAltitudeLine v-if="user.bags.length > 0" class="mb-6" />
    <BaseTitle :level="2" :hasDecoration="true" class="text-xl"
      >Your latest bags</BaseTitle
    >
    <BaggedList />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaggedList from '@/components/user/BaggedList.vue'
import ChartAltitudeLine from '@/components/user/ChartAltitudeLine.vue'
import TooltipInfo from '@/components/widgets/TooltipInfo.vue'
export default {
  components: {
    BaggedList,
    ChartAltitudeLine,
    TooltipInfo,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUser: (state) => state.users.currentUser,
    }),
    ...mapGetters('users', ['getTotalAltClimbed']),
  },
}
</script>

<style lang="scss" scoped></style>
