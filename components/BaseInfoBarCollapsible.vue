<template>
  <BaseInfoBar>
    <div class="flex flex-row items-center justify-between">
      <slot name="title">Info bar title</slot>
      <button @click="toggleInfoBarContent">{{ toggleButtonText }}</button>
    </div>
    <div :class="showInfoBarContent ? 'block' : 'hidden'">
      <slot name="content">Info bar content</slot>
    </div>
  </BaseInfoBar>
</template>

<script>
export default {
  data() {
    return {
      showInfoBarContent: false,
    }
  },
  computed: {
    toggleButtonText() {
      return this.showInfoBarContent ? 'hide' : 'show'
    },
  },
  methods: {
    toggleInfoBarContent() {
      this.showInfoBarContent = !this.showInfoBarContent
    },
  },
}
</script>

<style lang="scss" scoped></style>
