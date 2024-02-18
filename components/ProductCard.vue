<script setup lang="ts">
import { type IProduct } from '~/types/product.type'

defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true,
  },
})
</script>

<template>

  <NuxtLink class="product-card" :to="`/products/${product.id}`">

    <div class="w-64 h-32 bg-gray-100 shadow-md rounded-md overflow-hidden">
      <!-- <img src="data:image/jpeg;base64,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"> -->
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-1 truncate">{{ product.title }}</h2>
        <p class="text-gray-600 mb-4 truncate">{{ product.description }}</p>
        <p class="text-gray-800 font-bold">{{ product.price }}€</p>
      </div>
    </div>

  </NuxtLink>


</template>

<!-- <style lang="scss" scoped>
.product-card {
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0.5rem;
  height: 16rem;
  width: 19rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    z-index: 2;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    z-index: 1;
  }

  .product-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 3;
    color: white;
    padding: 0.5rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 0.5rem;
  }
}
</style> -->
