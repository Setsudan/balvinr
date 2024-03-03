<script setup lang="ts">

	const userID = useAuth().user?.value?.uid
	const products = ref()

	onMounted(async () => {
		const response = await useProduct().getProductBySellerId(userID ?? '')
		products.value = response
	})

</script>



<template>
	<main class="pt-10">
		<h1 class="text-2xl text-center m-6">My Products</h1>
		
		<div class="container mx-auto my-8 flex items-center justify-center">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
				<ProductCard v-for="product in products" :key="product.id" :product="product" />
			</div>
		</div>

	</main>
</template>
