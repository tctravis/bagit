<template>
  <div class="relative flex flex-row items-center justify-center">
    <font-awesome-icon :icon="['fa', 'certificate']" />
    <span class="absolute block text-white text-md">{{ totalBags }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      totalBags: (state) => state.users.user.totalBags,
    }),
  },
}
</script>
