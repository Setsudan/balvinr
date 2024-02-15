export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    if (userStore.user === null || useAuth().user === null) {
        return navigateTo('/auth/login')
    }
})