<template>
  <BaseButton
    :button-class="buttonThemeClass"
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
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: 'primary',
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
      hillsBagged: (state) => state.users.user.hillsBagged,
    }),
    hasBagged() {
      return this.hillsBagged.includes(this.hillId)
    },
    buttonThemeClass() {
      return this.hasBagged ? 'bg-theme-darkgrey' : `bg-theme-midgrey`
    },
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
      await this.$store.dispatch('users/createNewBag', {
        hill_id: this.hillId,
      })
      // console.log(addingBag, 'bagging')
      // // if (addingBag === 'prebagged') {
      //   this.error = addingBag
      // }
      this.isBagging = false
      // this.hasBagged = true
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
      // this.hasBagged = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
