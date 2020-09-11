<template>
  <div class="mb-4">
    <BadgeRack>
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 10 ? 'text-southern' : 'text-grey'"
        :label-class="totalBags >= 10 ? 'text-darkgrey' : 'text-grey'"
        icon-text="10"
        >10 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 20 ? 'text-eastern' : 'text-grey'"
        :label-class="totalBags >= 20 ? 'text-darkgrey' : 'text-grey'"
        icon-text="20"
        >20 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 50 ? 'text-northern' : 'text-grey'"
        :label-class="totalBags >= 50 ? 'text-darkgrey' : 'text-grey'"
        icon-text="50"
        >50 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 100 ? 'text-northwestern' : 'text-grey'"
        :label-class="totalBags >= 100 ? 'text-darkgrey' : 'text-grey'"
        icon-text="100"
        >100 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 150 ? 'text-western' : 'text-grey'"
        :label-class="totalBags >= 150 ? 'text-darkgrey' : 'text-grey'"
        icon-text="150"
        >150 bags</Badge
      >
      <Badge
        class="w-1/2"
        :icon-class="totalBags >= 200 ? 'text-fareastern' : 'text-grey'"
        :label-class="totalBags >= 200 ? 'text-darkgrey' : 'text-grey'"
        icon-text="200"
        >200 bags</Badge
      >
    </BadgeRack>
    <div
      class="rounded px-2 pt-2"
      :class="totalBags === totalHills ? 'bg-central' : 'bg-lightgrey'"
    >
      <Badge
        class="justify-center"
        :icon-class="totalBags === totalHills ? 'text-white' : 'text-grey'"
        :label-class="
          totalBags === totalHills ? 'text-white text-lg' : 'text-grey text-lg'
        "
        :badge-icon="['fa', 'trophy']"
        >Bagged 'em all!</Badge
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BadgeRack from '@/components/widgets/BadgeRack.vue'
import Badge from '@/components/widgets/Badge.vue'

export default {
  components: {
    Badge,
    BadgeRack,
  },
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
