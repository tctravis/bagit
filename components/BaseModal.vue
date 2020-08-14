<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden z-50"
    >
      <div
        class="fixed w-full h-full bg-grey opacity-50 z-1"
        @click="closeModal()"
      />

      <div
        class="relative bg-white w-11/12 md:max-w-md my-6 mx-auto rounded shadow-lg z-50"
      >
        <div class="p-2 flex flex-row justify-between items-center">
          <slot name="header" />
          <BaseButton
            fa-icon-class="window-close"
            button-class="cursor-pointer"
            @click="closeModal()"
            >Close</BaseButton
          >
        </div>

        <div class="p-2">
          <slot name="body" />
        </div>

        <div class="p-2">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('toggle-modal')
      document.querySelector('body').classList.remove('overflow-hidden')
    },
    openModal() {
      this.$emit('toggle-modal')
      document.querySelector('body').classList.add('overflow-hidden')
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
