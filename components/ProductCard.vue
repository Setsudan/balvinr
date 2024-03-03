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
    <div class="product-image">
      <LazyNuxtImg v-if="productImage !== null" :src="productImage" :alt="product.title" v-show="productImage" />
    </div>
    <div class="product-details">
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ product.price }}€</p>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19rem;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 12rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  text-align: center;
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
