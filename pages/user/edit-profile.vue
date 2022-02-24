<template>
  <LayoutPageWrapper>
    <template #header>
      <BasePageTitle><template #title>Your profile</template></BasePageTitle>
    </template>
    <template #main>
      <BaseFormFeedback v-if="feedback.message !== ''" :type="feedback.type">
        {{ feedback.message }}
      </BaseFormFeedback>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 sm:col-span-6 flow">
          <BaseTitle :level="2" :has-decoration="true" class="text-xl"
            >Profile details</BaseTitle
          >
          <BaseFormWrapper>
            <form @submit.prevent="updateProfile">
              <BaseInput
                id="userName"
                v-model="user.userName"
                label="Username"
                type="text"
              />

              <BaseButton type="submit" theme="eastern">
                <template #text>Update Profile</template>
              </BaseButton>
            </form>
          </BaseFormWrapper>
        </div>
        <div class="col-span-12 sm:col-span-6 flow">
          <BaseTitle :level="2" :has-decoration="true" class="text-xl"
            >Update login details</BaseTitle
          >
          <BaseFormWrapper>
            <form @submit.prevent="updateEmail">
              <BaseInput
                id="email"
                v-model="user.email"
                label="Email"
                type="email"
                :is-required="true"
              />

              <BaseButton type="submit" theme="eastern">
                <template #text>Update email</template>
              </BaseButton>
            </form>
          </BaseFormWrapper>
          <div class="form-section text-right">
            <nuxt-link to="/user/password-reset">Reset password</nuxt-link>
          </div>
        </div>
      </div>
    </template>
  </LayoutPageWrapper>
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
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Profile')
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
