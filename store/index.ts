import { defineStore } from "pinia";
import type { MainStateInterface as State } from "@/interfaces";

export const useMainStore = defineStore("main", {
  state: (): State => ({
    appName: "Pupils",
    search: "",
    loading: false,
  }),
});
