import {ref} from "vue";
import {useField, useForm} from "vee-validate";
import {useToast} from "vue-toastification";
import {useAxios} from "@/composable/useAxios";
import {useLocalStorage} from "@/composable/useLocalStorage";

export function useLogin() {
    const toast = useToast();
    const {api} = useAxios();
    const {setLocalStorage} = useLocalStorage();

    const {handleSubmit, handleReset} = useForm({
        validationSchema: {
            username(value: string) {
                if (value?.length >= 2) return true;

                return "Name needs to be at least 2 characters.";
            },

            password(value: string) {
                if (value?.length >= 2) return true;

                return "Name needs to be at least 2 characters.";
            },
        },
    });

    const username = useField("username");
    const password = useField("password");

    const loading = ref(false);

    const submit = handleSubmit(async (values) => {
        loading.value = true;
        await api
            .post("/auth/login/", {
                username: values?.username,
                password: values?.password,
            })
            .then((response: any) => {
                const {access, refresh} = response.data;
                handleReset();
                navigateTo("/");
                setLocalStorage("access", access);
                setLocalStorage("refresh", refresh);
                toast.success("Tizimga xo'sh kelibsiz");
            })
            .catch((error) => {
                toast.error("Tizimga kirishda xatolik.");
                console.log(error);
            })
            .finally(() => (loading.value = false));
    });
    return {submit, username, password, loading};
}

export function useLogout() {
    const toast = useToast();
    const {api} = useAxios();
    const {getLocalStorage, clearLocalStorage} = useLocalStorage();

    function menuActions(toPath: string) {
        if (toPath === "login") {
            const refresh = getLocalStorage("refresh");
            api.post("/auth/logout/", {refresh})
                .then(() => {
                    clearLocalStorage()
                    navigateTo(toPath);
                    toast.warning("Tizimdan chiqib ketdingiz!")
                })
        }
    }

    return {menuActions};
}
