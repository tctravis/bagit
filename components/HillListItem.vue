<template>
  <div class="w-full" :class="hasClimbed ? 'opacity-25' : ''">
    <nuxt-link
      class="flex flex-row justify-start items-center py-2"
      :to="{ name: 'hills-id', params: { id: hill.id } }"
    >
      <AreaIcon
        :area="hill.area"
        :class="('bg-' + hill.areaName) | removeSpaces | lowercase"
      />
      <h3 class="text-lg text-left mx-2">
        {{ hill.name }}
      </h3>
      <template v-if="hasClimbed">
        <font-awesome-icon :icon="['fa', 'check']" class="ml-auto" />
      </template>
      <template v-if="!hasClimbed">
        <BaseButton class="ml-auto" :button-class="'bg-' + hill.areaClassName"
          >Bag it</BaseButton
        >
      </template>
    </nuxt-link>
  </div>
</template>

<script>
import AreaIcon from '@/components/AreaIcon.vue'
export default {
  components: {
    AreaIcon,
  },
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hillsClimbed: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasClimbed() {
      return this.hillsClimbed.includes(this.hill.id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
