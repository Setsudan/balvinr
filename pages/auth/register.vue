<script setup lang="ts">
import { ref } from 'vue'
import type { IUser } from '~/types/users.type'

const user = ref<IUser>({
  username: '',
  email: '',
  birthdate: '',
  role: '',
})

const password = ref('')
const confirmPassword = ref('')
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const usernameRegex = /^[a-zA-Z0-9]{3,}$/

const registerUser = (e: Event) => {
  // prevent refresh
  e.preventDefault()
  if (
    passwordRegex.test(password.value) &&
    emailRegex.test(user.value.email) &&
    usernameRegex.test(user.value.username) &&
    password.value === confirmPassword.value
  ) {
    useAuth()
      .register(user.value, password.value)
      .then(() => {
        navigateTo('/profile')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
<template>
  <main id="register">
    <form @submit="registerUser">
      <label for="username">Username</label>
      <input v-model="user.username" type="text" id="username" required />
      <span
        v-if="!usernameRegex.test(user.username) && user.username.length >= 3"
        >Username must be at least 3 characters long and contain only letters
        and numbers</span
      >

      <label for="email">Email</label>
      <input v-model="user.email" type="email" id="email" required />
      <span v-if="!emailRegex.test(user.email) && user.email.length >= 3"
        >Invalid email</span
      >

      <label for="birthdate">Birthdate</label>
      <input v-model="user.birthdate" type="date" id="birthdate" required />

      <label for="role">Role</label>
      <select v-model="user.role" id="role" required>
        <option value="client">Client</option>
        <option value="seller">Seller</option>
      </select>

      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" required />
      <span v-if="!passwordRegex.test(password) && password.length >= 3"
        >Password must be at least 8 characters long and contain at least one
        uppercase letter, one lowercase letter, one number and one special
        character</span
      >

      <label for="confirmPassword">Confirm Password</label>
      <input
        v-model="confirmPassword"
        type="password"
        id="confirmPassword"
        required
      />
      <span v-if="password !== confirmPassword && confirmPassword.length >= 3"
        >Passwords do not match</span
      >

      <button
        type="submit"
        :disabled="
          !passwordRegex.test(password) ||
          !emailRegex.test(user.email) ||
          !usernameRegex.test(user.username) ||
          password !== confirmPassword
        "
      >
        Register
      </button>
    </form>
  </main>
</template>

<style lang="scss" scoped>
#register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1518838439236-2b73ceb4638a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: bottom;
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #fff;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    // make the background glossy
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.5);

    input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      width: 20rem;
    }

    select {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      width: 20rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #000;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: #333;
      }
    }

    .divider {
      margin: 1rem 0;
      width: 20rem;
      height: 1px;
      background-color: #000;
    }
  }
}
</style>
