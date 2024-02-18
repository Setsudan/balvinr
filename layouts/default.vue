<script setup lang="ts">

  const { signOut, user } = useAuth()
  const role = ref('')
  const cartItemsNums = ref(0)

  function handleSignOut() {
    signOut()
    navigateTo('/auth/login')
  }

  async function fetchUserRole() {
    const userRole = await useFirestore().getUser(user.value?.uid ?? '')
    role.value = userRole.role
  }

  async function getTotalCartItems() {
    const items = await useCart().totalItems
    cartItemsNums.value = items
  }

  onMounted(() => {
    fetchUserRole()
    getTotalCartItems()
  })

</script>



<template>
	<nav>

		<NuxtLink to="/">
			Home
		</NuxtLink>

		<NuxtLink to="/profile">
			Profile
		</NuxtLink>

		<NuxtLink v-if="role === 'seller'" to="/products/create">
			Create Product
		</NuxtLink>

		<NuxtLink to="/#products">
			Products
		</NuxtLink>

		<NuxtLink v-if="role === 'seller'" to="/my-products">
			My Products
		</NuxtLink>

		<NuxtLink to="/cart" class="cart">
			Cart
			<div class="num-item">
				<span v-if="cartItemsNums > 0">{{ cartItemsNums }}</span>
			</div>
		</NuxtLink>

		<button @click="handleSignOut">
			Sign Out
		</button>

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

    .cart {
      position: relative;
    }

    .num-item {
      position: absolute;
      top: -0.5rem;
      right: -1.5rem;
      color: white;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
}

</style>
