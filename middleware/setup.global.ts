import {useLocalStorage} from "@/composable/useLocalStorage";
import {useMainStore} from "@/store";
import {storeToRefs} from "pinia";

export default defineNuxtRouteMiddleware((to, _from) => {
    const store = useMainStore()
    const {appName} = storeToRefs(store)
    const {getLocalStorage, clearLocalStorage} = useLocalStorage();

    // app name
    appName.value = String(to.name).replace("index", "pupils").replace("-slug", "")

    // auth
    if (to.name === undefined) {
        return navigateTo("/");
    }
    if (getLocalStorage("refresh")) {
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
