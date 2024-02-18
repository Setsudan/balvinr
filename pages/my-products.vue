<script setup lang="ts">

	const userID = useAuth().user?.value?.uid

	const products = ref()

	onMounted(async () => {
		const response = await useProduct().getProductBySellerId(userID ?? '')
		products.value = response
	})

</script>



<template>

	<main>
		<h1 class="text-2xl text-center m-6">My Products</h1>
		<ProductsList :products="products" />
	</main>

</template>
