<template>
  <div>
    <button
      v-bind="$attrs"
      class="py-1 px-2 rounded-sm"
      :class="buttonClass"
      v-on="$listeners"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
    },
  },
}
</script>
