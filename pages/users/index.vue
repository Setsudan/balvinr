<script setup lang="ts">
import { onMounted, ref } from 'vue';
const users = ref([]);
const loading = ref(false);

onMounted(async () => {
    useFirestore()
});
