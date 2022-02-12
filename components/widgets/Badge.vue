<template>
  <div class="flex flex-row items-center">
    <div class="relative flex flex-row items-center justify-center">
      <font-awesome-icon
        :class="iconClass"
        :icon="badgeIcon"
        class="text-4xl"
      />
      <span
        v-if="iconText != ''"
        class="absolute block text-black font-bold text-md"
        >{{ iconText }}</span
      >
    </div>
    <span class="px-2" :class="labelClass"><slot>Badge text</slot></span>
  </div>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: false,
      default: '',
    },
    iconText: {
      type: String,
      default: '',
    },
    badgeIcon: {
      type: Array,
      required: false,
      default() {
        return ['fa', 'certificate']
      },
    },
    labelClass: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
