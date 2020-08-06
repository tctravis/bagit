<template>
  <div>
    <BasePageTitle><template v-slot:title>Fell list</template></BasePageTitle>
    <BaseInput
      id="hills-search-filter"
      v-model="search"
      label="Fell name:"
      type="text"
      placeholder="Search by fell name"
    />
    <div class="flex flex-wrap">
      <HillListItem
        v-for="hill in filteredHills"
        :key="hill.rank"
        :hill="hill"
        :hills-climbed="user.hillsClimbed"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HillListItem from '@/components/HillListItem.vue'

export default {
  components: {
    HillListItem,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState({
      hills: (state) => state.hills.hills,
      currentUser: (state) => state.users.currentUser,
      user: (state) => state.users.user,
    }),
    filteredHills() {
      return this.hills.filter((hill) => {
        return hill.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
}
</script>
