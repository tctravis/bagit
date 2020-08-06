<template>
  <div class="w-full">
    <nuxt-link
      class="flex flex-row justify-start items-center py-2"
      :to="{ name: 'hills-id', params: { id: hill.id } }"
    >
      <AreaIcon
        :area="hill.area"
        :class="('bg-' + hill.areaName) | removeSpaces | lowercase"
      />
      <h3 class="text-lg text-left mx-2" :class="hasClimbed ? 'text-grey' : ''">
        {{ hill.name }}
      </h3>
      <template v-if="hasClimbed">
        <font-awesome-icon
          :icon="['fa', 'check']"
          class="ml-auto"
          :class="hasClimbed ? 'text-grey' : ''"
        />
      </template>
      <template v-if="!hasClimbed">
        <BaseButton class="ml-auto" :buttonClass="'bg-' + hill.areaClassName"
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
