<template>
  <div class="border ml-2 mb-2">
    <div
      class="p-2"
      :class="('bg-' + hill.areaName) | removeSpaces | lowercase"
    >
      <span class="text-sm uppercase">{{ hill.areaName }}</span>
    </div>
    <div class="p-2">
      <nuxt-link :to="{ name: 'Hill', params: { id: hill.id } }">
        <h2 class="text-3xl">{{ hill.name }}</h2>
      </nuxt-link>
      <font-awesome-icon
        v-for="n in hill.heightRating"
        :key="n"
        :icon="['fa', 'mountain']"
      />
      <p>Altitude: {{ hill.height_m }}</p>
      <p>OS grid ref: {{ hill.os_grid_ref }}</p>
      <p>OS map: {{ hill.os_map }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped></style>
