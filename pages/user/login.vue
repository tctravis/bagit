<template>
  <div>
    <BaseFormFeedback v-if="feedback.message !== ''" :type="feedback.type">
      {{ feedback.message }}
    </BaseFormFeedback>

    <form @submit.prevent="login">
      <div class="form-section">
        <p class="text-error mb-4">* required</p>
        <BaseInput
          id="user-email"
          v-model="email"
          label="Email:"
          type="text"
          :is-required="true"
          @blur="$v.email.$touch()"
        />
        <BaseValidationMessage v-if="$v.email.$error" message-type="error"
          >Please enter your email</BaseValidationMessage
        >
        <BaseInput
          id="user-password"
          v-model="password"
          label="Password:"
          type="password"
          :is-required="true"
          @blur="$v.password.$touch()"
        />
        <BaseValidationMessage v-if="$v.password.$error" message-type="error"
          >Please enter your password</BaseValidationMessage
        >
        <div class="flex flex-row justify-between pt-4">
          <BaseLink to="/user/password-reset">Forgotten password?</BaseLink>
          <BaseButton
            :disabled="$v.$invalid"
            type="submit"
            button-class="bg-southern"
            >Log In</BaseButton
          >
        </div>
      </div>
    </form>
    <BaseInfoBar>
      New user?
      <BaseLink to="/user/register">Sign up for an account</BaseLink>
    </BaseInfoBar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: '',
      password: '',
      feedback: {
        type: '',
        message: '',
      },
    }
  },
  methods: {
    ...mapActions('users', ['fetchUser']),
    async login() {
      let loggedIn = await this.$store.dispatch('users/login', {
        email: this.email,
        password: this.password,
      })
      if (loggedIn.user !== undefined) {
        // console.log(loggedIn)
        this.fetchUser(loggedIn.user.uid)
        this.$router.push({
          path: '/user/dashboard',
          // path: '/',
        })
      } else {
        this.feedback.type = 'error'
        switch (loggedIn.code) {
          case 'auth/user-not-found':
            this.feedback.message =
              'The email you have entered is not linked to a Baggr account.'
            break
          case 'auth/wrong-password':
            this.feedback.message =
              'The password you have entered does not match the email.'
            break
          case 'auth/too-many-requests':
            this.feedback.message = loggedIn.message
            break
          default:
            this.feedback.message =
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Log in')
  },
}
</script>

<style lang="scss" scoped></style>
