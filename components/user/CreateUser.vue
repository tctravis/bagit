<template>
  <div>
    <form @submit.prevent="createUser">
      <div class="form-section">
        <p class="text-error mb-4">* required</p>
        <BaseInput
          id="firstName"
          v-model="user.userName"
          label="Username"
          type="text"
          :is-required="true"
          @blur="$v.user.userName.$touch()"
        />
        <BaseValidationMessage
          v-if="$v.user.userName.$error"
          message-type="error"
          >Please add a user name</BaseValidationMessage
        >
        <BaseInput
          id="email"
          v-model="user.email"
          label="Email"
          type="email"
          :is-required="true"
          @blur="$v.user.email.$touch()"
        />
        <BaseValidationMessage v-if="$v.user.email.$error" message-type="error"
          >Please enter a valid email</BaseValidationMessage
        >
        <BaseInput
          id="password"
          v-model="user.password"
          label="Password"
          type="password"
          :is-required="true"
          @blur="$v.user.password.$touch()"
        />
        <BaseValidationMessage
          v-if="$v.user.password.$error"
          message-type="error"
          >Please add a password</BaseValidationMessage
        >
        <BaseInput
          id="confirmPassword"
          v-model="user.confirmPassword"
          label="Confirm password"
          type="password"
          :is-required="true"
          @blur="$v.user.confirmPassword.$touch()"
        />
        <BaseValidationMessage
          v-if="$v.user.confirmPassword.$error"
          message-type="error"
          >Please make sure your passwords match</BaseValidationMessage
        >
        <div class="flex flex-row justify-end pt-4">
          <BaseButton
            :disabled="$v.$invalid"
            type="submit"
            button-class="bg-southern text-white"
            ><template #text>Update User</template></BaseButton
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      user: {
        userName: null,
        email: null,
        password: null,
      },
    }
  },
  methods: {
    createUser() {
      this.$emit('create-user', this.user)
    },
  },
  validations: {
    user: {
      userName: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
