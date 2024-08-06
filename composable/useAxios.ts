import axios from "axios";
import {useLocalStorage} from "@/composable/useLocalStorage";

export function useAxios() {
  const config = useRuntimeConfig();
  const baseURL = config.public.BASE_URL || "http://localhost:8000";
  const { getLocalStorage, setLocalStorage, clearLocalStorage } =
    useLocalStorage();

  const api = axios.create({
    baseURL,
  });

  // Request interceptor to attach the access token
  api.interceptors.request.use(
    (config) => {
      const access = getLocalStorage("access");
      if (access) config.headers.Authorization = `Bearer ${access}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token refresh
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const refresh = getLocalStorage("refresh");

      const isUnauthorized = error.response?.status === 401;
      const isTokenInvalid = error.response?.data?.code === "token_not_valid";

      if ((isUnauthorized || isTokenInvalid) && refresh) {
        try {
          const { data } = await axios.post(`${baseURL}/auth/refresh/`, {
            refresh,
          });
          setLocalStorage("access", data.access);

          // Retry the original request with the new access token
          error.config.headers.Authorization = `Bearer ${data.access}`;
          return api.request(error.config);
        } catch (refreshError) {
          clearLocalStorage();
          navigateTo("/login");
          return;
        }
      }
      return Promise.reject(error);
    }
  );

  return { api };
}
