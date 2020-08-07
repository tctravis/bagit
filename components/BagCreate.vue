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
        <BaseButton
          type="submit"
          button-class="bg-northwestern ml-32"
          :disabled="$v.$invalid"
          >Bag It!</BaseButton
        >
      </form>
    </template>
    <template v-if="bagged">
      <p>Bagged It!</p>
    </template>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    async createNewBag() {
      await this.$store.dispatch('users/createNewBag', {
        date: this.bag.date,
        comments: this.bag.comments,
        hill_id: this.hill.id,
        hill_name: this.hill.name,
        rating: this.bag.rating,
      })
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
