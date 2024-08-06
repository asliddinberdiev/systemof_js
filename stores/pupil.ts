import {defineStore} from "pinia";

interface PupilInterface {
    id: number;
    firstname: string;
    lastname: string;
    pupil_phone: string;
    parent_phone: string;
    image: string;
    group: number;
    end_time: string;
    created_at: string;
    updated_at: string;
}

interface State {
    list: PupilInterface[];
    item: PupilInterface | null;
    default: PupilInterface;
}

export const usePupilStore = defineStore("pupil", {
    state: (): State => ({
        list: [],
        item: null,
        default: {
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
});
