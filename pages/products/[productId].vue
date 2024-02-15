<template>
  <h1>Product</h1>
  <div v-if="product">
    <img :src="product.image" :alt="product.title" v-show="product.image" />
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <span>{{ product.price }}</span>
    <!-- <button @click="addToCart(product)">Add to cart</button> -->
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const route = useRoute()
const productId = route.params.productId
const product = ref()

onMounted(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000) // Simulating a delay of 2 seconds
  })
  const response = await useProduct().getProduct(productId as string)
  product.value = response
})
</script>
