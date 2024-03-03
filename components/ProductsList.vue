<script setup lang="ts">

import { onMounted, ref, watchEffect } from 'vue'

defineProps({
	productList: {
		type: Array,
		default: null,
		required: false,
	},
})

const products = ref()
const loadedProducts = ref(25)

onMounted(async () => {
	const response = await useProduct().getProducts()
	products.value = response.slice(0, loadedProducts.value)
})

function loadMore() {
	loadedProducts.value += 25
}

</script>



<template>
	<section>

		<div class="container mx-auto my-8 flex items-center justify-center">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

				<ProductCard v-for="product in productList ? productList : products" :key="product.id" :product="product" />

				<button @click="loadMore" class="bg-white hover:bg-gray-100 font-medium py-2 px-6 rounded-lg">
					Load More
				</button>

			</div>
		</div>

	</section>
</template>



<!-- <style lang="scss" scoped>
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style> -->
