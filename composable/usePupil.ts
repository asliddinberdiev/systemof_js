import { usePupilStore } from "@/store/pupil";
import { storeToRefs } from "pinia";

export function usePupil() {
  const store = usePupilStore();
  const { loading, list } = storeToRefs(store);
  const { fetchList } = store;

  return {loading, list, fetchList, store};
}

export function usePupilForm() {
  const defaultValue = {
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
  };

  return {
    defaultValue,
  };
}
