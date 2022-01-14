<template>
  <div class="container py-4">
    <BasePageTitle><template #title>Dashboard</template></BasePageTitle>
    <section>
      <BaseTitle :level="2" :has-decoration="true" class="text-xl"
        >Bagged by area</BaseTitle
      >
      <client-only>
        <ChartBaggedByArea />
      </client-only>
    </section>
    <section>
      <div class="flex flex-row items-center justify-between">
        <BaseTitle :level="2" :has-decoration="true" class="text-xl"
          >Altitude</BaseTitle
        >
        <TooltipInfo>
          <BaseParagraph>
            'Altitude bagged' is calculated using the prominence (rather than
            the altitude) of all the Wainwrights you have bagged.
          </BaseParagraph>
        </TooltipInfo>
      </div>
      <client-only>
        <ChartAltitudeLine class="mb-6" />
      </client-only>
    </section>
  </div>
</template>

<script>
import ChartBaggedByArea from '@/components/user/ChartBaggedByArea.vue'
import ChartAltitudeLine from '@/components/user/ChartAltitudeLine.vue'
import TooltipInfo from '@/components/widgets/TooltipInfo.vue'

export default {
  components: {
    ChartBaggedByArea,
    ChartAltitudeLine,
    TooltipInfo,
  },
}
</script>

<style lang="scss" scoped></style>
