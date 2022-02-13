<template>
  <div>
    <header>
      <slot name="header" />
    </header>
    <main class="bg-gradient-to-t to-darkgrey from-black pb-12">
      <div class="container">
        <slot name="main" />
      </div>
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
