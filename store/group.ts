import { defineStore } from "pinia";
import type {
  GroupStateInterface as State,
  GroupInterface,
} from "@/interfaces";
import { useAxios } from "@/composable/useAxios";

const { api } = useAxios();
const config = useRuntimeConfig();
const url = config.public.MAIN_URL;

export const useGroupStore = defineStore("group", {
  state: (): State => ({
    loading: true,
    list: [],
    item: null,
  }),
  getters: {
    getGroup: (state) => (id: number) =>
      state.list.find((item) => item.id === id),
  },
  actions: {
    async fetchList() {
      try {
        const res = await api.get<GroupInterface[]>(`${url}/groups/`);
        this.list = res.data;
      } catch (error) {
        console.error("group fetchList error: ", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
