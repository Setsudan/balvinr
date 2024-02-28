<script setup lang="ts">

import { onMounted } from 'vue'

definePageMeta({
  middleware: 'auth',
})

const user = useUserStore().user
const config = useRuntimeConfig()

onMounted(() => {

  if (!user || !useUserStore().isLoggedIn)
    navigateTo('/auth/login')

})

</script>



<template>
  <header>
    <div class="header-overlay" />
    <h2>StoreFire</h2>
    <h3>Find your new favorite store</h3>
  </header>

  <main>
    <section id="products">
      <h2 class="text-2xl text-center m-6">Stores</h2>
      <ProductsList />
    </section>
  </main>

  <DebugInfo
    message="Cette page affiche tous les produits mais je n'ai pas vraiment fini le bouton 'Load More' - Launay Ethan" />
</template>



<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/humane');

header {
  font-family: 'Humane', sans-serif;
  min-height: 100vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1535553786276-ba3c1681ad75?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  .header-overlay {
    background: linear-gradient(0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0) 100%);
    width: 100%;
    height: 100%;
    z-index: 1;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }

  @mixin header-text {
    z-index: 2;
    position: absolute;
    left: 2rem;
    color: white;
    letter-spacing: 0.5rem;
  }

  h2 {
    @include header-text;
    bottom: 2rem;
    font-size: 12rem;
    grid-column: 1 / 4;
    grid-row: 9 / 11;
  }

  h3 {
    @include header-text;
    bottom: 0;
    font-size: 3rem;
    width: 50%;
    grid-column: 1 / 4;
    grid-row: 11 / 12;
  }
}
</style>
