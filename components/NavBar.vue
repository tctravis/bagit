<template>
  <header
    class="bg-southern fixed left-0 right-0 top-0 h-12 flex flex-row items-center"
  >
    <div class="container">
      <div class="flex flex-row justify-between py-2">
        <nuxt-link to="/">BAG IT!</nuxt-link>
        <nav class="flex flex-row">
          <nuxt-link class="mx-2" to="/hills/list">Climb a fell</nuxt-link>
          <nuxt-link to="/user/dashboard">Your progress</nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>
