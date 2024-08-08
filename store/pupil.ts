import {defineStore} from "pinia";
import type {
    PupilStateInterface as State,
    PupilInterface,
} from "@/interfaces";
import {useAxios} from "@/composable/useAxios";
import {useToast} from "vue-toastification";

const {api} = useAxios();
const config = useRuntimeConfig();
const url = config.public.MAIN_URL;

export const usePupilStore = defineStore("pupil", {
    state: (): State => ({
        loading: true,
        list: [],
        item: {
            id: 0,
            firstname: "",
            lastname: "",
            pupil_phone: "",
            parent_phone: "",
            image: "",
            group: 0,
            created_at: "",
            updated_at: "",
        },
    }),
    getters: {
        getPupil: (state) => (id: number) =>
            state.list.find((item) => item.id === id),
    },
    actions: {
        async fetchList(search: string | number = "") {
            const toast = useToast();
            try {
                const res = await api.get<PupilInterface[]>(`${url}/pupils/${search && `?search=${search}`}`);
                this.list = res.data;
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
                else toast.error(String(error));
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async fetchItem(id: number) {
            const toast = useToast();
            try {
                const res = await api.get<PupilInterface>(`${url}/pupils/${id}/`);
                this.item = res.data;
            } catch (error) {
                if (error instanceof Error) {
                    if (error?.response?.status === 404) {
                        toast.error("not found");
                    } else {
                        toast.error(error.message);
                    }
                } else {
                    toast.error(String(error));
                }
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async createItem(item: PupilInterface | FormData) {
            const toast = useToast();
            try {
                const res = await api.post<PupilInterface>(`${url}/pupils/`, item, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                this.item = res.data;
                toast.success("Successfully created");
            } catch (error: any) {
                if (error?.response?.status === 400) {
                    toast.error("Enter the data correctly!");
                } else {
                    if (error instanceof Error) toast.error(error.message);
                    else toast.error(String(error));
                }
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async updateItem(id: number, item: PupilInterface | FormData) {
            const toast = useToast();
            try {
                const res = await api.patch<PupilInterface>(`${url}/pupils/${id}/`, item);
                this.item = res.data;
                toast.success("Successfully updated");
            } catch (error: any) {
                if (error?.response?.status === 400) {
                    toast.error("Enter the data correctly!");
                } else {
                    if (error instanceof Error) toast.error(error.message);
                    else toast.error(String(error));
                }
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async deleteItem(id: number) {
            const toast = useToast();
            try {
                await api.delete(`${url}/pupils/${id}/`);
                toast.success("Successfully deleted");
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
                else toast.error(String(error));
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});
