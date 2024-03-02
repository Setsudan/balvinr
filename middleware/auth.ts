export default defineNuxtRouteMiddleware((to, from) => {
  if (useAuth().user.value === null || useAuth().user.value === undefined) {
    return navigateTo('/auth/login')
  } else {
    return
  }
})
