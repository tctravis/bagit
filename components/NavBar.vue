<template>
  <header
    class="bg-northwestern fixed left-0 right-0 top-0 h-12 flex flex-row items-center"
  >
    <div class="container">
      <div class="flex flex-row justify-between py-2">
        <nuxt-link to="/">BAGGED IT</nuxt-link>
        <nav class="flex flex-row">
          <nuxt-link class="mx-2" to="/hills/list">Bag a fell</nuxt-link>
          <nuxt-link to="/user/dashboard">Your progress</nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>
