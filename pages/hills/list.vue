<template>
  <div>
    <BasePageTitle>Wainwrights</BasePageTitle>
    <div class="flex flex-row items-center py-2">
      <label for="hills-search-filter" class="mr-2">Fell name:</label>
      <input
        class="border-eastern border-2 rounded p-1 flex-grow"
        type="text"
        v-model="search"
        id="hills-search-filter"
        placeholder="Search by fell name"
      />
    </div>
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
