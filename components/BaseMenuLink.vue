<template>
  <nuxt-link
    class="p-4 md:px-4 md:py-2 rounded bg-southern hover:bg-darkgrey md:bg-darkgrey md:hover:bg-southern flex flex-row items-center"
    :to="route"
    v-on="$listeners"
  >
    <div v-if="icon" class="mr-2 w-6">
      <font-awesome-icon :icon="['fa', icon]" :class="iconClass" />
    </div>
    <slot>MenuLink</slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    route: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
