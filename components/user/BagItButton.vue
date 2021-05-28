<template>
  <BaseButton
    :button-class="'bg-' + areaClassName"
    :disabled="!currentUserId"
    @click="bagIt"
    ><template v-if="!hasBagged">Bag it!</template
    ><template v-if="hasBagged">Unbag it!</template></BaseButton
  >
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    hillId: {
      type: Number,
      required: true,
    },
    areaClassName: {
      type: String,
      default: 'northwestern',
      required: true,
    },
    hasBagged: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isBagging: false,
    }
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
    }),
  },
  methods: {
    bagIt() {
      if (this.hasBagged) {
        this.deleteBag()
      } else {
        this.createNewBag()
      }
    },
    async createNewBag() {
      this.isBagging = true
      let addingBag = await this.$store.dispatch('users/createNewBag', {
        hill_id: this.hillId,
      })
      if (addingBag === 'prebagged') {
        this.error = addingBag
      }
      this.isBagging = false
    },
    async deleteBag() {
      this.isBagging = true
      let deletingBag = await this.$store.dispatch('users/deleteBag', {
        hill_id: this.hillId,
      })
      if (deletingBag === 'not bagged') {
        this.error = deletingBag
      }
      this.isBagging = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
