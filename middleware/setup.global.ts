import {useLocalStorage} from '@/composables/useLocalStorage'

export default defineNuxtRouteMiddleware((to, from) => {
    const {getLocalStorage} = useLocalStorage()

    if (getLocalStorage('access')) {
        if (to.path === '/login') {
            return navigateTo('/')
        }
    } else {
        if (to.path !== '/login') {
            return navigateTo('/login')
        }
    }
})
