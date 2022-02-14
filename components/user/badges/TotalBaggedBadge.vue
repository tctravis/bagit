<template>
  <WidgetsBadge
    icon-class="text-eastern"
    label-class="sr-only"
    :icon-text="totalBags.toString()"
    >Total bags</WidgetsBadge
  >
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
