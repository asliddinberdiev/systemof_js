import {defineStore} from "pinia";

interface State {
    loading: boolean;
    appName: string;
}

export const useMainStore = defineStore("main", {
    state: (): State => ({
        loading: false,
        appName: "Pupils"
    }),
});
