<template>
  <div class="w-full">
    <div
      class="flex flex-row justify-start items-center py-2 cursor-pointer"
      :class="hasBagged ? 'opacity-50' : ''"
      @click="toggleDetails"
    >
      <HillsAreaIcon :hill="hill" />
      <h3 class="text-lg text-left mx-2">{{ hill.name }}</h3>

      <div class="ml-auto">
        <font-awesome-icon
          v-if="hasBagged"
          :icon="['fa', 'check']"
          class="ml-auto"
        />

        <template v-if="!hasBagged">
          <font-awesome-icon
            v-if="!detailsExpanded"
            :icon="['fa', 'chevron-right']"
          />
          <font-awesome-icon
            v-if="detailsExpanded"
            :icon="['fa', 'chevron-down']"
          />
        </template>
      </div>
    </div>
    <div v-if="detailsExpanded">
      <HillsHillDetails
        :hill="hill"
        :hills-bagged="hillsBagged"
        :distance="distance"
        @modal-button="parentMethod()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
    distance: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      detailsExpanded: false,
    }
  },
  computed: {
    ...mapState({
      hillsBagged: (state) => state.users.user.hillsBagged,
    }),
    hasBagged() {
      return this.hillsBagged.includes(this.hill.id)
    },
    ...mapState({
      currentUserId: (state) => state.users.user.id,
    }),
  },
  methods: {
    toggleDetails() {
      return (this.detailsExpanded = this.detailsExpanded ? false : true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
