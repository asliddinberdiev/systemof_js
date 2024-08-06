import {defineStore} from "pinia";

interface GroupInterface {
    id: number;
    name: string;
    day: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
}

interface State {
    list: GroupInterface[];
    item: GroupInterface | null;
    default: GroupInterface;
}

export const useGroupStore = defineStore("group", {
    state: (): State => ({
        list: [],
        item: null,
        default: {
            id: 0,
            name: "",
            day: "",
            start_time: "",
            end_time: "",
            created_at: "",
            updated_at: "",
        }
    }),
});
