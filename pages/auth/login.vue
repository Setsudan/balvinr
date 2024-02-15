<script lang="ts" setup>
import { ref } from "vue";
const { signIn } = useAuth();
const email = ref("");
const password = ref("");
const error = ref("");

const processLogin = () => {
  if (email.value.length > 0 && password.value.length > 0) {
    signIn(email.value, password.value).then((res: any) => {
      if (typeof res === "string") {
        error.value = res;
      } else {
        useCookie("user", res.user)
        useUserStore().setUser(res.user);
        navigateTo("/");
      }
    });
  }
};

definePageMeta({
  layout: "auth-layout"
});
</script>
<template>
  <main id="login">
    <div class="overlay"></div>
    <form @submit.prevent="processLogin">
      <h1>Login</h1>
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <span v-if="error.length > 0">{{ error }}</span>
      <button type="submit">Login</button>
      <div class="divider"></div>
      <router-link to="/auth/register">Register</router-link>
    </form>
  </main>
</template>

<style lang="scss" scoped>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1518838439236-2b73ceb4638a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: bottom;
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%);
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