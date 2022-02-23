<template>
  <div>
    <header>
      <slot name="header" />
    </header>
    <main class="main">
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
