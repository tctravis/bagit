<template>
  <div>
    <BaseFormFeedback v-if="feedback.message !== ''" :type="feedback.type">
      {{
      feedback.message
      }}
    </BaseFormFeedback>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 sm:col-span-6">
        <BaseTitle :level="2" :has-decoration="true" class="text-xl">Profile details</BaseTitle>
        <div class="form-section">
          <form @submit.prevent="updateProfile">
            <BaseInput id="userName" v-model="user.userName" label="Username" type="text" />
            <div class="form-section-buttons">
              <BaseButton type="submit" button-class="bg-southern text-white">
                <slot>Update Profile</slot>
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6">
        <BaseTitle :level="2" :has-decoration="true" class="text-xl">Update login details</BaseTitle>
        <div class="form-section">
          <form @submit.prevent="updateEmail">
            <BaseInput
              id="email"
              v-model="user.email"
              label="Email"
              type="email"
              :is-required="true"
            />
            <div class="form-section-buttons">
              <BaseButton type="submit" button-class="bg-southern text-white">
                <slot>Update email</slot>
              </BaseButton>
            </div>
          </form>
        </div>
        <div class="form-section text-right">
          <nuxt-link to="/user/password-reset">Reset password</nuxt-link>
        </div>
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Profile')
  },
}
</script>

<style lang="scss" scoped />
