<script setup lang="ts">

  import type { IProduct } from '~/types/product.type'

  const items = ref<IProduct[]>([])
  const loading = ref(true)
  const getItems = async () => {
    const products = useCart().items
    items.value = products
  }

  onMounted(() => {
    getItems().then(() => {
      loading.value = false
    })
  })

</script>



<template>
  <main>

    <h1 class="text-2xl text-center m-6">Stores</h1>

    <div v-if="loading">Loading...</div>
    <div v-else>

      <div v-if="items.length === 0" class="mb-4 text-center">No items in cart</div>
      <div v-else>

        <div v-for="item in items" :key="item.id">
          <div class="product">
            <img :src="item.image" alt="product image" />
            <div class="product-content">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <p>{{ item.price }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="text-center font-bold m-6">Total: {{ useCart().totalPrice }} €</div>
    
  </main>
</template>



<style lang="scss" scoped>

  main {
    margin-top: 5rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .product {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      img {
        width: 100px;
        height: 100px;
        margin-right: 1rem;
      }

      .product-content {
        h2 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        p {
          margin-bottom: 0.5rem;
        }
        
      }
    }

    .loading {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .empty-cart {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .total {
      font-size: 1.2rem;
      margin-top: 2rem;
    }
  }

</style>
