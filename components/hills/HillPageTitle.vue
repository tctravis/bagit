<template>
  <div class="flex flex-row items-start mb-4">
    <AreaIcon
      :area="hill.area"
      :class="('bg-' + hill.areaName) | removeSpaces | lowercase"
    />
    <h1 class="text-2xl ml-2"><slot>Page title</slot></h1>
    <BaseButton
      class="ml-auto"
      :button-class="'bg-' + hill.areaClassName"
      :disabled="this.$fireAuth.currentUser === null || hasBagged"
      @click="bagThis"
      ><template v-if="!hasBagged">Bag it!</template
      ><template v-if="hasBagged">Bagged already</template></BaseButton
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AreaIcon from '@/components/hills/AreaIcon.vue'

export default {
  components: {
    AreaIcon,
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
  },
  methods: {
    ...mapActions('users', ['toggleBagModal', 'setHillToBag']),
    bagThis() {
      this.setHillToBag(this.hill.id)
      this.toggleBagModal()
    },
  },
}
</script>

<style lang="scss" scoped></style>
