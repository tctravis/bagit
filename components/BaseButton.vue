<template>
  <div>
    <button v-bind="$attrs" class="p-1" :class="buttonClass" v-on="$listeners">
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
