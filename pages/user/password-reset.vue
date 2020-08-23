<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Reset your password</template></BasePageTitle
    >
    <BaseFormFeedback v-if="message">{{ message }}</BaseFormFeedback>
    <form @submit.prevent="resetPassword">
      <BaseInput
        id="user-email"
        v-model="email"
        label="Email:"
        type="text"
        @blur="$v.email.$touch()"
        :isRequired="true"
      />
      <BaseValidationMessage v-if="$v.email.$error" message-type="error"
        >Please enter a valid email</BaseValidationMessage
      >
      <div class="flex flex-row justify-end pt-4">
        <BaseButton
          :disabled="$v.$invalid"
          type="submit"
          button-class="bg-southern"
          >Reset password</BaseButton
        >
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: '',
      message: '',
    }
  },
  methods: {
    async resetPassword() {
      let resetEmail = await this.sendResetEmail()
      console.log(resetEmail)
      if (resetEmail) {
        switch (resetEmail.code) {
          case 'auth/user-not-found':
            this.message = 'The email you have entered has not been recognised.'
            break
          default:
            this.message = 'The email you have entered has not been recognised.'
        }
      }
    },
    async sendResetEmail() {
      try {
        let actionCodeSettings = {
          url: 'https://tender-stonebraker-214900.netlify.app/user/login',
          handleCodeInApp: false,
        }
        return await this.$fireAuth.sendPasswordResetEmail(
          this.email,
          actionCodeSettings
        )
      } catch (err) {
        return err
      }
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
}
</script>

<style lang="scss" scoped></style>
