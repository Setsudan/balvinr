<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'

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
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    <button @click="loadMore">Load More</button>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
