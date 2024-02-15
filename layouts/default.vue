<script setup lang="ts">
const { signOut } = useAuth()
function handleSignOut() {
  signOut()
  navigateTo('/auth/login')
}
</script>

<template>
  <nav>
    <NuxtLink to="/profile"> Profile </NuxtLink>
    <button @click="handleSignOut">Sign Out</button>
  </nav>
  <slot />
  <footer />
</template>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 100;
  height: 3rem;

  a {
    color: white;
    text-decoration: none;
  }

  button {
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
  }
}
</style>
