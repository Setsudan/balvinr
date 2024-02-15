<script setup lang="ts">
import { ref, onMounted } from 'vue';
definePageMeta({
    middleware: 'auth'
});

const router = useRouter();
const uid = router.params?.uid;


const user = ref();
const loading = ref(true);

onMounted(() => {
    user.value = useFirestore().getUser(uid);
    console.log(user.value);
    loading.value = false;
});
</script>
<template>
    <h1>
        Profile
    </h1>
    <div class="profile">
        <div class="profile__info">
            <h2>{{ user?.username }}</h2>
            <p>{{ user?.email }}</p>
          <pre>
            {{ JSON.stringify(user, null, 2) }}
          </pre>
        </div>
    </div>
</template>
