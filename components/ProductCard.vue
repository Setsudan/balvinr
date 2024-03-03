<script setup lang="ts">
import { type IProduct } from '~/types/product.type'

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true,
  },
})

const { product } = toRefs(props);
const productImage = ref<string | null>(null)

const storage = useStorage()

const getProductImage = async (productId: string) => {
  try {
    const image = await storage.getProductImage(productId)
    productImage.value = image
  } catch (error) {
    console.error('Error fetching product image:', error)
    return null
  }
}

onMounted(() => {
  getProductImage(product.value.id)
})
</script>

<template>
  <NuxtLink class="product-card" :to="`/products/${product.id}`">
    <div class="w-64 h-32 bg-gray-100 shadow-md rounded-md overflow-hidden">
      <LazyNuxtImg v-if="productImage !== null" :src="productImage" :alt="product.title" v-show="productImage" />
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-1 truncate">{{ product.title }}</h2>
        <p class="text-gray-600 mb-4 truncate">{{ product.description }}</p>
        <p class="text-gray-800 font-bold">{{ product.price }}€</p>
      </div>
    </div>
  </NuxtLink>
</template>



<style lang="scss" scoped>
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
</style>



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
