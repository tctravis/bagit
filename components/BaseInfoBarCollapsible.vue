<template>
  <BaseInfoBar>
    <div class="flex flex-row items-center justify-between">
      <slot name="title">Info bar title</slot>
      <button @click="toggleInfoBarContent">{{ toggleButtonText }}</button>
    </div>
    <div class="flow" :class="showInfoBarContent ? 'block' : 'hidden'">
      <slot name="content">Info bar content</slot>
    </div>
  </BaseInfoBar>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showInfoBarContent: this.show,
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
