<template>
  <div>
    <BaseButton
      class="ml-auto"
      :button-class="'bg-' + hill.areaClassName"
      :disabled="this.$fireAuth.currentUser === null"
      ><template v-if="!hasBagged">Bag it!</template
      ><template v-if="hasBagged">Unbag it!</template></BaseButton
    >
    <!-- <BaseModal ref="modalName">
      <template v-slot:header>
        <h1>Bag it!</h1>
      </template>

      <template v-slot:body>
        <BagCreate :hill="hill" />
      </template>

      <template v-slot:footer> </template>
    </BaseModal> -->
  </div>
</template>

<script>
// import BagCreate from '@/components/user/BagCreate.vue'
export default {
  // components: {
  //   BagCreate,
  // },
  props: {
    hill: {
      type: Object,
      required: true,
    },
    hasBagged: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
