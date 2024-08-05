import { useLocalStorage } from "~/composable/useLocalStorage";

export default defineNuxtRouteMiddleware((to, _from) => {
  const { getLocalStorage, clearLocalStorage } = useLocalStorage();
  const refresh = getLocalStorage("refresh");
  
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
