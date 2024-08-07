import {defineStore} from "pinia";
import type {
    PupilStateInterface as State,
    PupilInterface,
} from "@/interfaces";
import {useAxios} from "@/composable/useAxios";

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
            end_time: "",
            created_at: "",
            updated_at: "",
        },
    }),
    getters: {
        getPupil: (state) => (id: number) =>
            state.list.find((item) => item.id === id),
    },
    actions: {
        async fetchList() {
            try {
                const res = await api.get<PupilInterface[]>(`${url}/pupils/`);
                this.list = res.data;
            } catch (error) {
                console.error("pupil fetchList error: ", error);
            } finally {
                this.loading = false;
            }
        },
        async fetchItem(id: number) {
            try {
                const res = await api.get<PupilInterface>(`${url}/pupils/${id}/`);
                this.item = res.data;
            } catch (error) {
                console.error("pupil getItem error: ", error);
            } finally {
                this.loading = false;
            }
        },
    },
});
