<template>
  <div class="mb-4">
    <WidgetsBadgeRack>
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 10 ? 'text-southern' : 'text-grey'"
        :label-class="totalBags >= 10 ? 'text-color-body' : 'text-grey'"
        icon-text="10"
        >10 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 20 ? 'text-eastern' : 'text-grey'"
        :label-class="totalBags >= 20 ? 'text-color-body' : 'text-grey'"
        icon-text="20"
        >20 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 50 ? 'text-northern' : 'text-grey'"
        :label-class="totalBags >= 50 ? 'text-color-body' : 'text-grey'"
        icon-text="50"
        >50 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 100 ? 'text-northwestern' : 'text-grey'"
        :label-class="totalBags >= 100 ? 'text-color-body' : 'text-grey'"
        icon-text="100"
        >100 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 150 ? 'text-western' : 'text-grey'"
        :label-class="totalBags >= 150 ? 'text-color-body' : 'text-grey'"
        icon-text="150"
        >150 bags</WidgetsBadge
      >
      <WidgetsBadge
        class="w-1/2"
        :icon-class="totalBags >= 200 ? 'text-fareastern' : 'text-grey'"
        :label-class="totalBags >= 200 ? 'text-color-body' : 'text-grey'"
        icon-text="200"
        >200 bags</WidgetsBadge
      >
    </WidgetsBadgeRack>
    <div
      class="rounded px-2 pt-2"
      :class="totalBags === totalHills ? 'bg-central' : 'bg-lightgrey'"
    >
      <WidgetsBadge
        class="justify-center"
        :icon-class="totalBags === totalHills ? 'text-white' : 'text-grey'"
        :label-class="
          totalBags === totalHills ? 'text-white text-lg' : 'text-grey text-lg'
        "
        :badge-icon="['fa', 'trophy']"
        >Bagged 'em all!</WidgetsBadge
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('hills', ['getHills', 'getTotalHills', 'getAreas']),
    ...mapState({
      userBags: (state) => state.users.user.bags,
      hillsBagged: (state) => state.users.user.hillsBagged,
    }),
    totalBags() {
      return this.userBags.length
    },
    totalHills() {
      return this.getTotalHills
    },
  },
}
</script>

<style lang="scss" scoped></style>
