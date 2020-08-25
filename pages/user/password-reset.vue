<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Reset your password</template></BasePageTitle
    >
    <BaseFormFeedback v-if="feedback.message !== ''" :type="feedback.type">{{
      feedback.message
    }}</BaseFormFeedback>
    <form @submit.prevent="resetPassword">
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
      feedback: {
        type: '',
        message: '',
      },
    }
  },
  methods: {
    async resetPassword() {
      let resetEmail = await this.sendResetEmail()
      // if successful resetEmail is null
      if (resetEmail) {
        this.feedback = {
          type: 'error',
          message: 'The email you have entered has not been recognised.',
        }
      } else {
        this.feedback = {
          type: 'success',
          message: 'A reset password email has been sent to ' + this.email,
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
