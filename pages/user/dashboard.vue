<template>
  <div class="container flow py-4">
    <BasePageTitle><template #title>Dashboard</template></BasePageTitle>
    <section>
      <UserTotalBags />
    </section>
    <ChartBaggedByArea />
    <ChartAltitudeLine />
  </div>
</template>

<script>
import ChartBaggedByArea from '@/components/user/ChartBaggedByArea.vue'
import ChartAltitudeLine from '@/components/user/ChartAltitudeLine.vue'
import UserTotalBags from '@/components/user/UserTotalBags.vue'
import TooltipInfo from '@/components/widgets/TooltipInfo.vue'

export default {
  components: {
    ChartBaggedByArea,
    ChartAltitudeLine,
    TooltipInfo,
    UserTotalBags,
  },
}
</script>

<style lang="scss" scoped></style>
