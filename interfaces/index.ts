export interface GroupInterface {
    id: number;
    name: string;
    day: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
}

export interface PupilInterface {
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

export interface GroupStateInterface {
    loading: boolean;
    list: GroupInterface[];
    item: GroupInterface | null;
}

export interface PupilStateInterface {
    loading: boolean;
    list: PupilInterface[];
    item: PupilInterface | null;
}

export interface MainStateInterface {
    appName: string;
}