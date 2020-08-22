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
    <h3>Filter</h3>
    <p>Filter by area: Western, Nothern etc</p>
    <p>Already bagged | Not bagged</p>
    <h3>Sort</h3>
    <p>High-Low | Low-High</p>
    <HillListItem
      v-for="hill in filteredHills"
      :key="hill.rank"
      :hill="hill"
      :hills-bagged="user.hillsBagged"
    />
    <BagCreateModal />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HillListItem from '@/components/hills/HillListItem.vue'
import BagCreateModal from '@/components/user/BagCreateModal.vue'

export default {
  components: {
    HillListItem,
    BagCreateModal,
  },
  data() {
    return {
      search: '',
      showBagCreateModal: false,
    }
  },
  computed: {
    ...mapState({
      hills: (state) => state.hills.hills,
      currentUser: (state) => state.users.currentUser,
      user: (state) => state.users.user,
    }),
    filteredHills() {
      let hillsArray = this.hills
      return hillsArray.filter((hill) => {
        return hill.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  methods: {
    ...mapActions('users', ['closeBagModal']),
  },
  mounted() {
    this.closeBagModal()
  },
}
</script>
