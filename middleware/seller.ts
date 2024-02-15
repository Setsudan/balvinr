export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore().user;
    const getUser = useFirestore().getUser;

    const asyncFunc = async () => {
        if (userStore?.uid === null || useAuth().user === null || useAuth().user === undefined) {
            return navigateTo('/auth/login')
        }
        if (userStore !== null) {
            const user = await getUser(userStore.uid);
            if (user.role !== 'seller') {
                return navigateTo('/auth/login')
            }
        }
    }
    asyncFunc();
})