<template>
  <div class="flex flex-row items-center relative">
    <div
      @click="toggleInfoWindow"
      class="flex flex-row items-center p-1 cursor-pointer"
    >
      <font-awesome-icon
        :icon="['fa', 'question-circle']"
        class="text-xl text-western"
      />
    </div>
    <div
      v-if="showInfoWindow"
      class="absolute rounded-md bg-lightgrey top-0 right-0 w-56 md:w-64 p-2 mr-5 mt-5 border border-western"
    >
      <slot>Info window</slot>
      <div
        @click="toggleInfoWindow"
        class="flex flex-row items-center justify-end p-1 cursor-pointer"
      >
        <span class="text-sm mr-2">Close</span>
        <font-awesome-icon
          :icon="['fa', 'times']"
          class="text-xl text-western"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInfoWindow: false,
    }
  },
  methods: {
    toggleInfoWindow() {
      this.showInfoWindow = this.showInfoWindow === true ? false : true
    },
  },
}
</script>

<style lang="scss" scoped></style>
