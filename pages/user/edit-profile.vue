<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>Edit profile</template></BasePageTitle
    >
    <UserUpdate v-on:user-update="editProfile">Edit your details</UserUpdate>
  </div>
</template>

<script>
import UserUpdate from '@/components/user/UserUpdate.vue'
export default {
  components: {
    UserUpdate,
  },
  methods: {
    editProfile(user) {
      // console.log(user)
      this.$store.dispatch('users/editProfile', {
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
      })
    },
  },
}
</script>

<style lang="scss" scoped />
