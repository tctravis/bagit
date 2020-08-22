<template>
  <div>
    <BasePageTitle><template v-slot:title>Log in</template></BasePageTitle>
    <BaseFormFeedback v-if="message">{{ message }}</BaseFormFeedback>
    <form @submit.prevent="login">
      <BaseInput
        id="user-email"
        v-model="email"
        label="Email:"
        type="text"
        @blur="$v.email.$touch()"
        :isRequired="true"
      />
      <BaseValidationMessage v-if="$v.email.$error" message-type="error"
        >Please enter your email</BaseValidationMessage
      >
      <BaseInput
        id="user-password"
        v-model="password"
        label="Password:"
        type="password"
        @blur="$v.password.$touch()"
        :isRequired="true"
      />
      <BaseValidationMessage v-if="$v.password.$error" message-type="error"
        >Please enter your password</BaseValidationMessage
      >
      <div class="flex flex-row justify-end pt-4">
        <BaseButton
          :disabled="$v.$invalid"
          type="submit"
          button-class="bg-southern"
          >Log In</BaseButton
        >
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
    }
  },
  methods: {
    async login() {
      let loggedIn = await this.$store.dispatch('users/login', {
        email: this.email,
        password: this.password,
      })
      if (loggedIn.user !== undefined) {
        this.$router.push({
          path: '/user/dashboard',
        })
      } else {
        switch (loggedIn.code) {
          case 'auth/user-not-found':
            this.message =
              'The email you have entered is not linked to a Baggr account.'
            break
          case 'auth/wrong-password':
            this.message =
              'The password you have entered does not match the email.'
            break
          case 'auth/too-many-requests':
            this.message = loggedIn.message
            break
          default:
            this.message =
              'Sorry, we have not been able to log you in. Please check that you are online and are using the correct log-in details.'
        }
      }
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
}
</script>

<style lang="scss" scoped></style>
