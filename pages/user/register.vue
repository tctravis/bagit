<template>
  <div>
    <BasePageTitle><template v-slot:title>Register</template></BasePageTitle>
    <div v-if="message" class="bg-western p-2 mb-4 rounded">
      <p>{{ message }}</p>
    </div>
    <CreateUser v-on:create-user="register">Register</CreateUser>
  </div>
</template>

<script>
import CreateUser from '@/components/user/CreateUser.vue'
export default {
  data() {
    return {
      message: null,
    }
  },
  components: {
    CreateUser,
  },
  methods: {
    async register(req, res) {
      const { userName, email, password } = req
      const newUser = {
        userName,
        email,
        password,
      }

      let registerUser = await this.$store.dispatch('users/register', newUser)
      if (registerUser) {
        switch (registerUser.code) {
          case 'auth/email-already-in-use':
            this.message =
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
