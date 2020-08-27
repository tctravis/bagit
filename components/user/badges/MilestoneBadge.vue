<template>
  <div class="relative flex flex-row items-center justify-center">
    <font-awesome-icon
      :class="totalBags >= target ? 'text-western' : 'text-grey'"
      class="text-4xl"
      :icon="['fa', 'certificate']"
    />
    <span class="absolute block text-white text-md">{{ target }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Badge from '@/components/widgets/Badge.vue'
export default {
  props: {
    target: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      userBags: (state) => state.users.user.bags,
    }),
    totalBags() {
      return this.userBags.length
    },
  },
}
</script>

<style lang="scss" scoped></style>
