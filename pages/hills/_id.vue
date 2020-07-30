<template>
  <div>
    <BasePageTitle>Hill: {{ id }}</BasePageTitle>
  </div>
</template>

<script>
export default {
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  head() {
    return {
      title: 'Hill #' + this.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Details about hill' + this.id,
        },
      ],
    }
  },
}
</script>
