import {useLocalStorage} from "@/composable/useLocalStorage";
import {useMainStore} from "@/stores";
import {storeToRefs} from "pinia";

export default defineNuxtRouteMiddleware((to, _from) => {
    const store = useMainStore()
    const {appName} = storeToRefs(store)

    const {getLocalStorage, clearLocalStorage} = useLocalStorage();
    const refresh = getLocalStorage("refresh");


    appName.value = String(to.name).replace("slug", String(to?.params?.slug))
    if (String(to.name) === "index") appName.value = "pupils"
    if (String(to.name) === "slug") appName.value = `pupils-${String(to.params.slug)}`

    if (to.name === undefined) {
        return navigateTo("/");
    }

    if (refresh) {
        if (to.path === "/login") {
            return navigateTo("/");
        }
    } else {
        clearLocalStorage();
        if (to.path !== "/login") {
            return navigateTo("/login");
        }
    }
});
