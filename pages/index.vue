<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
});

const user = ref();

onMounted(() => {
    user.value = useAuth().user;
});
</script>

<template>
    <div>
        <h1>Home</h1>
        <pre>
            {{ user }}
        </pre>
    </div>
</template>