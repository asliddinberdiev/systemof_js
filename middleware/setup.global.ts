import {useLocalStorage} from "@/composable/useLocalStorage";
import {useMainStore} from "@/store";
import {storeToRefs} from "pinia";

export default defineNuxtRouteMiddleware((to, _from) => {
    const store = useMainStore()
    const {appName} = storeToRefs(store)
    const {getLocalStorage, clearLocalStorage} = useLocalStorage();

    // app name
    switch (String(to.name)) {
        case "index":
            appName.value = "pupils";
            break;
        case "index-slug":
            appName.value = "pupil";
            break;
        case "groups":
            appName.value = "groups";
            break;
        case "groups-slug":
            appName.value = "group";
            break;
    }

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
