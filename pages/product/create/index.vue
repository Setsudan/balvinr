<template>
    <h1>
        Create product
    </h1>
    <div v-if="!isCreating">
        <form @submit.prevent="handleCreate">
            // image
            <input type="file" @change="onChnageFile" />
            <input type="text" v-model="newProduct.title" placeholder="Title" />
            <textarea v-model="newProduct.description" placeholder="Description"></textarea>
            <input type="number" v-model="newProduct.price" placeholder="Price" />
            <button type="submit">Create</button>
        </form>
    </div>
    <div v-else>
        Creating...
    </div>
</template>

<script setup lang="ts">
import { type ICreateProduct } from '~/types/product.type';

const newProduct = ref<ICreateProduct>({
    title: '',
    description: '',
    price: 0,
    image: '',
});

const isCreating = ref(false);

const onChnageFile = async (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (file) {
        try {
            // Get the download URL of the uploaded image
            const imageUrl = await useProductr().updateProductImage(file);

            // Set the image URL to the newProduct object
            newProduct.value.image = imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
};


const handleCreate = async () => {
    // Create the product
    if (!newProduct.value.title || !newProduct.value.description || !newProduct.value.price) return;
    isCreating.value = true;
    const productId = await useProduct().createProduct(newProduct.value);

    // Redirect to the created product page
    if (productId) {
        router.push(`/product/${productId}`);
    }
};

</script>
