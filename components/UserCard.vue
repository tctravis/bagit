<template>
  <div class="border ml-2 mb-2">
    <div class="p-2 bg-southern">
      <span class="text-sm uppercase">Fellwalker</span>
    </div>
    <div class="p-2">
      <h2 class="text-3xl">{{ user.firstName }} {{ user.secondName }}</h2>
      <p>Wainwrights climbed: {{ user.hillsClimbed.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped></style>
