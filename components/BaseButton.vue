<template>
  <div>
    <button
      v-bind="$attrs"
      class="button"
      :class="buttonClass"
      v-on="$listeners"
    >
      <slot />
      <div v-if="faIconClass">
        <font-awesome-icon :icon="['fa', faIconClass]" class="ml-2" />
      </div>
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: null,
    },
    buttonClass: {
      type: String,
      default: null,
    },
    faIconClass: {
      type: String,
      default: null,
    },
  },
  // computed: {
  //   btnClasses() {
  //     const btnClasses = []
  //     switch (this.theme) {
  //       case 'northwestern':
  //         btnClasses.push('bg-northwestern', 'text-color-body')
  //         break
  //       case 'eastern':
  //         btnClasses.push('bg-eastern', 'text-color-body')
  //         break
  //       case 'southern':
  //         btnClasses.push('bg-southern', 'text-color-body')
  //         break
  //       default:
  //         btnClasses.push('bg-grey-dark', 'text-white')
  //     }
  //     return btnClasses.join(' ')
  //   },
  // },
}
</script>
