import { defineStore } from "pinia";

interface UserInterface {
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

interface GroupInterface {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  created_at: Date;
  updated_at: Date;
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
  pupil: PupilInterface;
  group: GroupInterface;
  user: boolean;
}

export const useMainStore = defineStore("main", {
  state: (): State => ({
    mode: false,
  }),
});
