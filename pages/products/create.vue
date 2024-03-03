<script setup lang="ts">
import { type ICreateProduct } from '~/types/product.type'

definePageMeta({
  title: 'Create Product',
  description: 'Create a new product',
  middleware: 'seller',
})

const product = ref<ICreateProduct>({
  title: '',
  description: '',
  price: 0,
  image: '',
  seller: '',
})

const image = ref<File>()
const error = ref<string>('')

const handleImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (file && file.type.startsWith('image/')) {
    image.value = file
  } else {
    error.value = 'Please select a valid image file.'
  }
}

const createProduct = async () => {
  if (!product.value.title || !product.value.description || !product.value.price || !image.value) {
    error.value = 'Please fill in all the required fields and select an image.'
    return
  }

  const userID = useAuth().user?.value?.uid

  if (userID) {
    product.value.seller = userID
  }

  const productId = await useFirestore().createProduct(product.value)

  if (image.value) {
    await useStorage().addImageToProduct(productId, image.value)
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  navigateTo(`/products/${productId}`)
}
</script>

<template>
  <main>
    <h1 class="text-2xl text-center m-6">Create Product</h1>

    <form @submit.prevent="createProduct">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="product.title" />
      </div>

      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="product.description"></textarea>
      </div>

      <div>
        <label for="price">Price</label>
        <input type="number" id="price" v-model="product.price" />
      </div>

      <div>
        <label for="image">Image</label>
        <input type="file" id="image" @change="handleImage" accept="image/*" />
      </div>

      <div v-if="error" class="text-red-500">{{ error }}</div>

      <button type="submit" class="bg-white hover:bg-gray-100 font-medium py-2 px-6 rounded-lg">Create</button>
    </form>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
