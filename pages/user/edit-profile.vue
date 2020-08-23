<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Edit profile</template></BasePageTitle
    >

    <div class="sm:w-3/5">
      <BaseFormFeedback v-if="feedback.message !== ''" :type="feedback.type">{{
        feedback.message
      }}</BaseFormFeedback>
      <h3 class="text-xl">Profile details</h3>
      <div class="form-section">
        <form @submit.prevent="updateProfile">
          <BaseInput
            id="userName"
            v-model="user.userName"
            label="Username"
            type="text"
          />
          <div class="form-section-buttons">
            <BaseButton type="submit" button-class="bg-southern text-white"
              ><slot>Update Profile</slot></BaseButton
            >
          </div>
        </form>
      </div>
      <h3 class="text-xl">Update login details</h3>
      <div class="form-section">
        <form @submit.prevent="updateEmail">
          <BaseInput
            id="email"
            v-model="user.email"
            label="Email"
            type="email"
            :isRequired="true"
          />
          <div class="form-section-buttons">
            <BaseButton type="submit" button-class="bg-southern text-white"
              ><slot>Update email</slot></BaseButton
            >
          </div>
        </form>
      </div>
      <div class="form-section text-right">
        <nuxt-link to="/user/password-reset">Reset password</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      feedback: {
        message: '',
        type: '',
      },
    }
  },
  computed: {
    ...mapGetters('users', ['getUser']),
    user() {
      let user = Object.assign({}, this.getUser)
      return user
    },
  },
  methods: {
    async updateProfile() {
      let updateRef = await this.$store.dispatch('users/updateProfile', {
        userName: this.user.userName,
      })
      if (updateRef === 'success') {
        this.feedback = {
          type: 'success',
          message: 'Your profile has been updated',
        }
      } else {
        this.feedback = {
          type: 'error',
          message: 'Failed to update your profile',
        }
      }
    },
    async updateEmail() {
      let emailUpdateRef = await this.$store.dispatch(
        'users/updateEmail',
        this.user.email
      )
      if (emailUpdateRef === 'success') {
        this.feedback = {
          type: 'success',
          message: 'Your email has been updated',
        }
      } else {
        this.feedback = {
          type: 'error',
          message: emailUpdateRef.message,
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped />
