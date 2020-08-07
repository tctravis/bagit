<template>
  <div>
    <button
      v-bind="$attrs"
      class="py-1 px-2 rounded flex flex-row disabled:opacity-50"
      :class="buttonClass"
      v-on="$listeners"
    >
      <slot />
      <div v-if="faIconClass != ''">
        <font-awesome-icon :icon="['fa', faIconClass]" class="ml-2" />
      </div>
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
    faIconClass: {
      type: String,
      default: '',
    },
  },
}
</script>
