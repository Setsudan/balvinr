<template>
    <h1>
        Edit product
    </h1>
    <div v-if="product && !isEditing">
        <img :src="product.image" :alt="product.title" v-show="product.image" />
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <span>{{ product.price }}</span>
        <button @click="isEditing = true">Edit</button>
    </div>
    <div v-else-if="product && isEditing">
        <h2>Edit product</h2>
        <form @submit.prevent="handleSave" v-if="product">
            <input type="text" v-model="product.title" />
            <textarea v-model="product.description"></textarea>
            <input type="number" v-model="product.price" />
            <button type="submit">Save</button>
            <button @click="isEditing = false">Cancel</button>
        </form>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup lang="ts">
import { type IProduct } from '~/types/product.type';

const productId = useRoute().params.productId;
const product = ref<IProduct | null>(null);

const isEditing = ref(false);

const handleSave = () => {
    // Save the product
    if (!productId || !product.value) return;
    useProduct().updateProduct(productId as string, product.value);

    // Set isEditing to false
    isEditing.value = false;
};

onMounted(async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000); // Simulating a delay of 2 seconds
    });
    const response = await useProduct().getProduct(productId as string);
    product.value = response?.data;
});

</script>
