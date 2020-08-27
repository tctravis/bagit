<template>
  <div class="relative flex flex-row items-center justify-center">
    <font-awesome-icon
      :class="user.totalBags >= target ? 'text-western' : 'text-grey'"
      class="text-4xl"
      :icon="['fa', 'certificate']"
    />
    <span class="absolute block text-white text-md">{{ target }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      user: (state) => state.users.user,
    }),
    totalBags() {
      return this.user.hillsBagged && this.user.hillsBagged.length
    },
    passedMilestone() {
      return this.totalBags >= this.target
    },
  },
}
</script>
