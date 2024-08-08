export interface GroupInterface {
    id: number;
    name: string;
    day: boolean;
    start_time: string;
    end_time: string;
    created_at?: string;
    updated_at?: string;
}

export interface PupilInterface {
    id: number;
    firstname: string;
    lastname: string;
    pupil_phone: string;
    parent_phone: string;
    group: number;
    image: string;
    created_at?: string;
    updated_at?: string;
}

export interface GroupStateInterface {
    loading: boolean;
    list: GroupInterface[];
    item: GroupInterface;
}

export interface PupilStateInterface {
    loading: boolean;
    list: PupilInterface[];
    item: PupilInterface;
}

export interface MainStateInterface {
    appName: string;
}