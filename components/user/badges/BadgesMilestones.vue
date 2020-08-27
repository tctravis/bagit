<template>
  <div class="mb-4">
    <BadgeRack>
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 10 ? 'text-southern' : 'text-grey'"
        :labelClass="totalBags >= 10 ? 'text-darkgrey' : 'text-grey'"
        iconText="10"
        >10 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 20 ? 'text-eastern' : 'text-grey'"
        :labelClass="totalBags >= 20 ? 'text-darkgrey' : 'text-grey'"
        iconText="20"
        >20 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 50 ? 'text-northern' : 'text-grey'"
        :labelClass="totalBags >= 50 ? 'text-darkgrey' : 'text-grey'"
        iconText="50"
        >50 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 100 ? 'text-northwestern' : 'text-grey'"
        :labelClass="totalBags >= 100 ? 'text-darkgrey' : 'text-grey'"
        iconText="100"
        >100 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 150 ? 'text-western' : 'text-grey'"
        :labelClass="totalBags >= 150 ? 'text-darkgrey' : 'text-grey'"
        iconText="150"
        >150 bags</Badge
      >
      <Badge
        class="w-1/2"
        :iconClass="totalBags >= 200 ? 'text-fareastern' : 'text-grey'"
        :labelClass="totalBags >= 200 ? 'text-darkgrey' : 'text-grey'"
        iconText="200"
        >200 bags</Badge
      >
    </BadgeRack>
    <div
      class="rounded px-2 pt-2"
      :class="totalBags === totalHills ? 'bg-central' : 'bg-lightgrey'"
    >
      <Badge
        class="justify-center"
        :iconClass="totalBags === totalHills ? 'text-white' : 'text-grey'"
        :labelClass="
          totalBags === totalHills ? 'text-white text-lg' : 'text-grey text-lg'
        "
        :badgeIcon="['fa', 'trophy']"
        >Bagged 'em all!</Badge
      >
    </div>
  </div>
</template>

<script>
import calcMode from '@/utils/calcMode.js'
import { mapGetters, mapState } from 'vuex'
import BadgeRack from '@/components/widgets/BadgeRack.vue'
import Badge from '@/components/widgets/Badge.vue'

export default {
  components: {
    Badge,
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
