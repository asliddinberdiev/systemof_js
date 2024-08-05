import { defineStore } from "pinia";

interface GroupInterface {
  id: number;
  name: string;
  day: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

interface PupilInterface {
  id: number;
  firstname: string;
  lastname: string;
  pupil_phone: number;
  parent_phone: number;
  image: string;
  group: number;
  end_time: string;
  created_at: Date;
  updated_at: Date;
}

interface State {
  pupilList: PupilInterface[];
  groupList: GroupInterface[];
  pupil: PupilInterface | null;
  group: GroupInterface | null;
  access: string;
  refresh: string;
}

export const useMainStore = defineStore("main", {
  state: (): State => ({
    pupilList: [],
    groupList: [],
    pupil: null,
    group: null,
    access: "",
    refresh: "",
  }),
});
