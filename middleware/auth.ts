export default defineNuxtRouteMiddleware((to, from) => {
  if (
    useAuth().user.value === null ||
    useAuth().user.value === undefined
  ) {
    return navigateTo('/auth/login')
  } else {
    console.log('user is logged in')
    console.log(useAuth().user.value)
  }
})
