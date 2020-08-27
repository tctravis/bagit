<template>
  <nuxt-link
    v-on="$listeners"
    class="p-4 hover:bg-northern flex flex-row items-center"
    :to="route"
    ><font-awesome-icon
      :icon="['fa', icon]"
      class="mr-2"
      :class="iconClass"
    /><slot>MenuLink</slot></nuxt-link
  >
</template>

<script>
export default {
  props: {
    icon: String,
    route: String,
    iconClass: String,
  },
}
</script>

<style lang="scss" scoped></style>
