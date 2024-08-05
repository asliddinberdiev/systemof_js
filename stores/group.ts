import {defineStore} from "pinia";
import {ref, reactive} from "vue";
import {useAxios} from "@/composable/useAxios";

export const useGroupStore = defineStore("group", () => {
    const {api} = useAxios();

    const list = ref<Array<any>>([]);
    const item = reactive({
        id: 0,
        name: "",
        day: "",
        start_time: "00:00",
        end_time: "00:00"
    });

    const loading = ref(false);

    const defaultItem = {
        id: 0,
        name: "",
        day: "",
        start_time: "00:00",
        end_time: "00:00"
    };

    const fetchList = async () => {
        loading.value = true;
        try {
            list.value = await api.get("/api/v1/groups/");
        } catch (error) {
            console.error("Failed to fetch group list:", error);
        } finally {
            loading.value = false;
        }
    };

    const createItem = async (newItem: any) => {
        try {
            const item = await api.post("/api/v1/groups/", newItem);
            list.value.unshift(item)
        } catch (error) {
            console.error("Failed to create group:", error);
        }
    };

    const updateItem = async (updatedItem: any) => {
        try {
            await api.patch(`/api/v1/groups/${updatedItem.id}/`, updatedItem);
            const index = list.value.findIndex((i) => i.id === updatedItem.id);
            if (index !== -1) {
                list.value[index] = {...updatedItem};
            }
        } catch (error) {
            console.error("Failed to update group:", error);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            await api.delete(`/api/v1/groups/${id}/`);
            list.value = list.value.filter((i) => i.id !== id);
        } catch (error) {
            console.error("Failed to delete group:", error);
        }
    };

    const resetItem = () => {
        Object.assign(item, defaultItem);
    };

    return {
        list,
        item,
        loading,
        fetchList,
        createItem,
        updateItem,
        deleteItem,
        resetItem
    };
});
