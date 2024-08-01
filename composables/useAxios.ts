import {useLocalStorage} from "@/composables/useLocalStorage";
import {da} from "vuetify/locale";

export function useAxios() {
    const {getLocalStorage, setLocalStorage, clearLocalStorage} = useLocalStorage()
    const config = useRuntimeConfig()
    const base_url = config.public.BASE_URL
    const refresh_token = getLocalStorage("refresh")
    const access_token = getLocalStorage("access")


    async function list(url: string) {
    }

    async function get(url: string) {
    }

    async function update(url: string, data: any) {
    }

    async function remove(url: string) {
    }

    async function login(username: string, password: string) {
        const {data, error} = await useFetch(`${base_url}/auth/login/`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (data) {
            setLocalStorage("access", data.value?.access)
            setLocalStorage("refresh", data.value?.refresh)
            navigateTo("")
        }

        return {data: toRaw(data?.value), error: toRaw(error?.value)}
    }

    async function logout() {
    }

    async function refresh() {
        if (refresh_token) {
            const {data, error} = await useFetch(`${base_url}/auth/refresh/`, {
                method: 'POST',
                body: JSON.stringify({refresh_token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(toRaw(data), toRaw(error))
        } else {
            clearLocalStorage()
            navigateTo('login')
        }
    }


    return {list, get, update, remove, login, logout, refresh};
}