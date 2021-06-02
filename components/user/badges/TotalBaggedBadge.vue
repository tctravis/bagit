<template>
  <Badge
    icon-class="text-primary"
    label-class="text-white"
    :icon-text="totalBags.toString()"
    >Total bags</Badge
  >
</template>

<script>
import { mapState } from 'vuex'
import Badge from '@/components/widgets/Badge.vue'
export default {
  components: {
    Badge,
  },
  computed: {
    ...mapState({
      totalBags: (state) => state.users.user.totalBags,
    }),
  },
}
</script>
