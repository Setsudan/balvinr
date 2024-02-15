
<script setup lang="ts">
import { ref } from 'vue';
import type { IUser } from '~/types/users.type';

const user = ref<IUser>({
    username: '',
    email: '',
    birthdate: '',
    role: ''
});

const password = ref('');
const confirmPassword = ref('');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

const registerUser = () => {
    useAuth().signUp(user.value, password.value);
};
</script>
<template>
    <form @submit="registerUser">
        <label for="username">Username</label>
        <input v-model="user.username" type="text" id="username" required>

        <label for="email">Email</label>
        <input v-model="user.email" type="email" id="email" required>

        <label for="birthdate">Birthdate</label>
        <input v-model="user.birthdate" type="date" id="birthdate" required>

        <label for="role">Role</label>
        <select v-model="user.role" id="role" required>
            <option value="client">Client</option>
            <option value="seller">Seller</option>
        </select>

        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required>

        <label for="confirmPassword">Confirm Password</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required>

        <button type="submit">Register</button>
    </form>
</template>