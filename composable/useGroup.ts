import { storeToRefs } from "pinia";
import { useGroupStore } from "@/store/group";

export function useGroup() {
  const store = useGroupStore();
  const { loading, list } = storeToRefs(store);
  const { fetchList } = store;
  return { loading, list, fetchList, store };
}

export function useGroupForm() {
  const defaultValue = {
    id: 0,
    name: "",
    day: "",
    start_time: "",
    end_time: "",
    created_at: "",
    updated_at: "",
  };
  return {};
}
