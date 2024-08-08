import {defineStore, storeToRefs} from "pinia";
import type {GroupStateInterface as State, GroupInterface} from "@/interfaces";
import {useAxios} from "@/composable/useAxios";
import {useToast} from "vue-toastification";
import {useMainStore} from "@/store";

const {api} = useAxios();
const config = useRuntimeConfig();
const url = config.public.MAIN_URL;

export const useGroupStore = defineStore("group", {
    state: (): State => ({
        loading: true,
        list: [],
        item: {
            id: 0,
            name: "",
            day: true,
            start_time: "",
            end_time: "",
            created_at: "",
            updated_at: "",
        },
    }),
    getters: {
        getGroupListWithName: (state: State) => state.list.map(item => ({
            id: item.id, name: item.name
        })),
        getGroup: (state) => (id: number) =>
            state.list.find((item) => item.id === id),
        getGroupWithName: (state) => (id: number) => {
            const item = state.list.find(item => item.id === id);
            return item ? item.name : "";
        }
    },
    actions: {
        async fetchList(search: string | number = "") {
            const mainStore = useMainStore()
            const {loading} = storeToRefs(mainStore)
            const toast = useToast();
            loading.value = true
            try {
                const res = await api.get<GroupInterface[]>(`${url}/groups/${search && `?search=${search}`}`);
                this.list = res.data;
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
                else toast.error(String(error));
                throw error;
            } finally {
                loading.value = false
                this.loading = false;
            }
        },
        async fetchItem(id: number) {
            const toast = useToast();
            try {
                const res = await api.get<GroupInterface>(`${url}/groups/${id}/`);
                this.item = res.data;
            } catch (error) {
                if (error instanceof Error) {
                    if (error?.response?.status === 404) {
                        toast.error("not found")
                    } else {
                        toast.error(error.message);
                    }
                } else {
                    toast.error(String(error))
                }
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async createItem(item: GroupInterface) {
            const toast = useToast();
            try {
                const res = await api.post<GroupInterface>(`${url}/groups/`, item);
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
        async updateItem(item: GroupInterface) {
            const toast = useToast();
            try {
                const res = await api.patch<GroupInterface>(`${url}/groups/${item.id}/`, item);
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
                await api.delete(`${url}/groups/${id}/`);
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
