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
    <HillListItem
      v-for="hill in filteredHills"
      :key="hill.rank"
      :hill="hill"
      :hills-bagged="user.hillsBagged"
    />
    <BaseModal>
      <template v-slot:header>
        <h1>Bag it!</h1>
      </template>

      <template v-slot:body>
        <BagCreate :hill="hill" />
      </template>

      <template v-slot:footer> </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HillListItem from '@/components/hills/HillListItem.vue'
import BagCreate from '@/components/user/BagCreate.vue'

export default {
  components: {
    HillListItem,
    BagCreate,
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
      let hillsArray = this.hills
      return hillsArray.filter((hill) => {
        return hill.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
}
</script>
