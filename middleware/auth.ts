export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore().user;
    if (userStore?.uid === null || useAuth().user === null || useAuth().user === undefined) {
        return navigateTo('/auth/login')
    }
})