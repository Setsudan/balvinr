
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
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

const registerUser = (e: Event) => {
    // prevent refresh
    e.preventDefault();
    if (passwordRegex.test(password.value)
        && emailRegex.test(user.value.email)
        && usernameRegex.test(user.value.username)
        && password.value === confirmPassword.value) {
        useAuth().signUp(user.value, password.value);
    }
};
</script>
<template>
    <form @submit="registerUser">
        <label for="username">Username</label>
        <input v-model="user.username" type="text" id="username" required>
        <span v-if="!usernameRegex.test(user.username) && user.username.length >= 3">Username must be at least 3 characters
            long and contain only letters
            and numbers</span>

        <label for="email">Email</label>
        <input v-model="user.email" type="email" id="email" required>
        <span v-if="!emailRegex.test(user.email) && user.email.length >= 3">Invalid email</span>

        <label for="birthdate">Birthdate</label>
        <input v-model="user.birthdate" type="date" id="birthdate" required>

        <label for="role">Role</label>
        <select v-model="user.role" id="role" required>
            <option value="client">Client</option>
            <option value="seller">Seller</option>
        </select>

        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required>
        <span v-if="!passwordRegex.test(password) && password.length >= 3">Password must be at least 8 characters long and
            contain at least one
            uppercase letter, one lowercase letter, one number and one special character</span>

        <label for="confirmPassword">Confirm Password</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required>
        <span v-if="password !== confirmPassword && confirmPassword.length >= 3">Passwords do not match</span>

        <button type="submit"
            :disabled="!passwordRegex.test(password) || !emailRegex.test(user.email) || !usernameRegex.test(user.username) || password !== confirmPassword">Register</button>
    </form>
</template>