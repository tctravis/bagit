<template>
  <div>
    <template v-if="!bagged">
      <form class="flex flex-col" @submit.prevent="createNewBag">
        <h2 class="mb-4 text-2xl">
          <span>Bag</span> <span>{{ hill.name }}</span>
        </h2>
        <BaseDatePicker
          id="bag-date"
          v-model="bag.date"
          label="Date:"
          @opened="validateDate()"
        />
        <BaseValidationMessage v-if="$v.bag.date.$error" message-type="error"
          >Please add the date you bagged this fell</BaseValidationMessage
        >
        <BaseTextArea
          id="bag-comments"
          v-model="bag.comments"
          label="Comments:"
        />
        <BaseSelect
          v-model="bag.rating"
          label="Rate this bag:"
          :options="ratingOptions"
        />
        <div class="flex flex-row justify-end">
          <BaseButton
            type="submit"
            button-class="bg-northwestern"
            :disabled="$v.$invalid"
            ><template #text>Bag It!</template></BaseButton
          >
        </div>
        <BaseValidationMessage v-if="error === 'prebagged'" message-type="error"
          >You've already bagged this fell!</BaseValidationMessage
        >
      </form>
    </template>
    <template v-if="bagged">
      <p>Bagged It!</p>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    hill: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ratingOptions: [1, 2, 3, 4, 5],
      bag: {
        date: '',
        comments: '',
        rating: '',
      },
      bagged: false,
      error: '',
    }
  },
  computed: {
    ...mapState({
      bags: (state) => state.users.user.bags,
    }),
    hasBagged() {
      return false
    },
  },
  methods: {
    async createNewBag() {
      let addingBag = await this.$store.dispatch('users/createNewBag', {
        date: this.bag.date,
        comments: this.bag.comments,
        hill_id: this.hill.id,
        rating: this.bag.rating,
      })
      if (addingBag === 'prebagged') {
        this.error = addingBag
        return false
      }
      this.bagged = true
    },
    validateDate() {
      this.$v.bag.date.$touch()
    },
  },
  validations: {
    bag: {
      date: {
        required,
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
