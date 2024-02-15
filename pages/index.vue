<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
});

const user = ref();

onMounted(() => {
    user.value = useAuth().user;
});

const signOut = () => {
    useAuth().signOut();
    navigateTo('/');
};
</script>

<template>
    <div>
        <h1>Home</h1>
        <pre>
            {{ user }}
        </pre>
        <button @click="signOut">
            Sign out
        </button>
    </div>
</template>