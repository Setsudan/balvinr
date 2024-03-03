<template>
    <main>

        <h1 class="text-2xl text-center m-6">Edit Product</h1>

        <div v-if="product" class="product">

            <img :src="imageUrl" :alt="product.title" v-if="imageUrl" />

            <div class="product-content">
                <input v-model="product.title" class="input" placeholder="Title" />
                <textarea v-model="product.description" class="textarea" placeholder="Description"></textarea>
                <input v-model="product.price" class="input" placeholder="Price" />
                <button @click="updateProduct" class="bg-white hover:bg-gray-100 font-medium py-2 px-6 rounded-lg">
                    Update
                </button>
            </div>
        </div>

        <div v-else>Loading...</div>

    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IProduct } from '~/types/product.type'
const route = useRoute();
const productId = route.params.productId;
const product = ref();
const imageUrl = ref<string | null>('');
const userStore = useUserStore().user;
const role = ref('');

const getUserRole = async () => {
    const user = await useFirestore().getUser(userStore?.uid as string)
    role.value = user.role
}

onMounted(async () => {
    const response = await useProduct().getProduct(productId as string)
    product.value = response

    // Check role is seller and user is the owner of the product
    await getUserRole();


    if (role.value === 'seller' && product.value?.seller === userStore?.uid) {
        if (response) {
            const productImage = await useStorage().getProductImage(productId as string)
            imageUrl.value = productImage
        }
    } else {
        navigateTo('/')
    }


})

const updateProduct = async () => {
    await useProduct().editProduct(userStore?.uid as string, productId as string, product.value)
    navigateTo('/')
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

        input,
        textarea {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 0.5rem 1rem;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    }
}
</style>
