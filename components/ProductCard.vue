<script setup lang="ts">
import { type IProduct } from '~/types/product.type';

defineProps({
    product: {
        type: Object as PropType<IProduct>,
        required: true,
    },
});
</script>

<template>
    <NuxtLink class="product-card" :to="`/products/${product.id}`">
        <img :src="product.image" :alt="product.title" v-show="product.image" />
        <div class="product-overlay"></div>
        <div class="product-details">
            <h3>{{ product.title }}</h3>
            <!-- <p>{{ product.description }}</p> -->
            <p>{{ product.price }}€</p>
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