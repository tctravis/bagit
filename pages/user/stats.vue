<template>
  <div class="container">
    <template v-if="currentUserId === ''">
      <LoggedOutMessage />
    </template>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 sm:col-span-6">
        <BaseTitle :level="2" :has-decoration="true" class="text-xl"
          >Bagged by area</BaseTitle
        >
        <BaseInfoBar>
          {{ user.userName }}, you have bagged {{ totalBagged }} of
          {{ totalHills }} Wainwrights
        </BaseInfoBar>
        <ChartBaggedByArea />
      </div>
      <div class="col-span-12 sm:col-span-6">
        <BaseTitle :level="2" :has-decoration="true" class="text-xl"
          >Altitude</BaseTitle
        >
        <BaseInfoBar>
          <div class="flex flex-row items-center justify-between">
            <p>
              Altitude bagged:
              <span>{{ getTotalAltClimbed }}m</span>
            </p>

            <TooltipInfo>
              <BaseParagraph>
                'Altitude bagged' is calculated using the prominence (rather
                than the altitude) of all the Wainwrights you have bagged.
              </BaseParagraph>
            </TooltipInfo>
          </div>
        </BaseInfoBar>
        <ChartAltitudeLine v-if="user.bags.length > 0" class="mb-6" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LoggedOutMessage from '@/components/user/LoggedOutMessage.vue'
import ChartBaggedByArea from '@/components/user/ChartBaggedByArea.vue'
import ChartAltitudeLine from '@/components/user/ChartAltitudeLine.vue'
import TooltipInfo from '@/components/widgets/TooltipInfo.vue'
export default {
  components: {
    LoggedOutMessage,
    ChartBaggedByArea,
    ChartAltitudeLine,
    TooltipInfo,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      currentUserId: (state) => state.users.currentUserId,
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Statistics')
  },
}
</script>

<style lang="scss" scoped></style>
