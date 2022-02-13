<template>
  <PageWrapper>
    <template #header>
      <BasePageTitle><template #title>Dashboard</template></BasePageTitle>
    </template>
    <template #main>
      <div class="flow">
        <UserTotalBags />
        <ChartBaggedByArea />
        <ChartAltitudeLine />
      </div>
    </template>
  </PageWrapper>
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
