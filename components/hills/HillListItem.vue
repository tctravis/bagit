<template>
  <div class="w-full">
    <div
      class="flex flex-row justify-start items-center py-2 cursor-pointer"
      :class="hasBagged ? 'opacity-25' : ''"
      @click="toggleDetails"
    >
      <AreaIcon
        :area="hill.area"
        :class="('bg-' + hill.areaName) | removeSpaces | lowercase"
      />
      <h3 class="text-lg text-left mx-2">
        {{ hill.name }}
      </h3>
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
      <HillDetails
        :hill="hill"
        :hillsBagged="hillsBagged"
        v-on:modal-button="parentMethod()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AreaIcon from '@/components/hills/AreaIcon.vue'
import HillDetails from '@/components/hills/HillDetails.vue'

export default {
  components: {
    AreaIcon,
    HillDetails,
  },
  data() {
    return {
      detailsExpanded: false,
    }
  },
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hillsBagged: {
      type: Array,
      required: true,
    },
  },
  computed: {
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
    parentMethod() {
      console.log('parent')
    },
  },
}
</script>

<style lang="scss" scoped></style>
