import { defineStore } from "pinia";
import type {
  PupilStateInterface as State,
  PupilInterface,
} from "@/interfaces";
import { useAxios } from "@/composable/useAxios";

const { api } = useAxios();
const config = useRuntimeConfig();
const url = config.public.MAIN_URL;

export const usePupilStore = defineStore("pupil", {
  state: (): State => ({
    loading: true,
    list: [],
    item: null,
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
  },
});
