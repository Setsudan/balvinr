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

watchEffect(() => {
	console.log(products.value)
})
</script>

<template>
	<section>
		<ProductCard
			v-for="product in productList ? productList : products"
			:key="product.id"
			:product="product"
		/>
		<button @click="loadMore" class="bg-white hover:bg-gray-100 font-medium py-2 px-6 rounded-lg">
			Load More
		</button>
	</section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
