export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    if (userStore.user === null) {
        return navigateTo('/auth/login')
    }
})