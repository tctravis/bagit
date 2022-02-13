<template>
  <PageWrapper>
    <template #header>
      <BasePageTitle><template #title>Register</template></BasePageTitle>
    </template>
    <template #main>
      <BaseFormFeedback v-if="feedback.message !== ''" :type="feedback.type">{{
        feedback.message
      }}</BaseFormFeedback>
      <CreateUser @create-user="register">Register</CreateUser>
    </template>
  </PageWrapper>
</template>

<script>
import CreateUser from '@/components/user/CreateUser.vue'
export default {
  components: {
    CreateUser,
  },
  data() {
    return {
      feedback: {
        type: '',
        message: '',
      },
    }
  },
  mounted() {
    this.$store.dispatch('pages/setPageTitle', 'Register')
  },
  methods: {
    async register(req) {
      const { userName, email, password } = req
      const newUser = {
        userName,
        email,
        password,
      }

      let registerUser = await this.$store.dispatch('users/register', newUser)

      if (registerUser) {
        this.feedback.type = 'error'
        switch (registerUser.code) {
          case 'auth/email-already-in-use':
            this.feedback.message =
              'This email is already linked to another account. Try using a different email, or reset your password'
            break
          default:
            this.message = 'great!'
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
