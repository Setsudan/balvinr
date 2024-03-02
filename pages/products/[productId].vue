<template>
  <main>

    <h1 class="text-2xl text-center m-6">Product</h1>

    <div v-if="product" class="product">

      <img :src="imageUrl" :alt="product.title" v-if="imageUrl" />

      <div class="product-content">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <span>{{ product.price }} €</span>
        <button @click="addToCart(product)" class="bg-white hover:bg-gray-100 font-medium py-2 px-6 rounded-lg">Add to
          cart</button>
      </div>

    </div>

    <div v-else>Loading...</div>

  </main>
</template>



<script setup lang="ts">

import { ref, onMounted } from 'vue'
import type { IProduct } from '~/types/product.type'
const route = useRoute()
const productId = route.params.productId
const product = ref()
const imageUrl = ref<string | null>('')

onMounted(async () => {
  const response = await useProduct().getProduct(productId as string)
  product.value = response


  if (response) {
    const productImage = await useStorage().getProductImage(productId as string)
    imageUrl.value = productImage
  }
})

const addToCart = async (product: IProduct) => {
  const item = await useProduct().getProduct(productId as string)

  useCart().addItem(product)
}

</script>




<style lang="scss" scoped>
main {
  margin-top: 5rem;
}

.product {
  display: flex;
  padding: 1rem;
  gap: 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;

  img {
    width: auto;
    height: 15rem;
    object-fit: cover;
    border-radius: 1rem;
  }

  .product-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }

    span {
      font-size: 1.5rem;
    }

  }
}

// button {
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 0.5rem;
//   background-color: #000;
//   color: #fff;
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     background-color: #333;
//   }
// }
</style>
