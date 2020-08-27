<template>
  <div>
    <div class="flex flex-row justify-end">
      <BasePill
        :is-active="hillList.sort === 'desc'"
        class="bg-darkgrey text-white mr-2"
        @click="sortByHeight('desc')"
        >High-Low</BasePill
      >
      <BasePill
        :is-active="hillList.sort === 'asc'"
        class="bg-darkgrey text-white"
        @click="sortByHeight('asc')"
        >Low-High</BasePill
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
