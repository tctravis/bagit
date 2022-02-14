<template>
  <LayoutPageWrapper>
    <template #header>
      <BasePageTitle><template #title>Dashboard</template></BasePageTitle>
    </template>
    <template #main>
      <div class="flow">
        <UserTotalBags />
        <UserChartBaggedByArea />
        <UserChartAltitudeLine />
      </div>
    </template>
  </LayoutPageWrapper>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
