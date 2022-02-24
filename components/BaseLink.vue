<template>
  <nuxt-link class="underline" :to="to"><slot>Link text</slot></nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
      default: '/',
    },
  },
}
</script>

<style lang="scss" scoped></style>
