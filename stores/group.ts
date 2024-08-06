import {defineStore} from "pinia";
import {useAxios} from "@/composable/useAxios";

export const useGroupStore = defineStore("group", {
    state: () => ({
        list: [] as Array<any>,
        item: {
            id: 0,
            name: "",
            day: "",
            start_time: "00:00",
            end_time: "00:00"
        },
        loading: false,
        defaultItem: {
            id: 0,
            name: "",
            day: "",
            start_time: "00:00",
            end_time: "00:00"
        }
    }),

    actions: {
        async fetchList() {
            const {api} = useAxios();
            this.loading = true;
            try {
                this.list = await api.get("/api/v1/groups/");
            } catch (error) {
                console.error("Failed to fetch group list:", error);
            } finally {
                this.loading = false;
            }
        },

        async createItem(newItem: any) {
            const {api} = useAxios();
            try {
                const item = await api.post("/api/v1/groups/", newItem);
                this.list.unshift(item);
            } catch (error) {
                console.error("Failed to create group:", error);
            }
        },

        async updateItem(updatedItem: any) {
            const {api} = useAxios();
            try {
                await api.patch(`/api/v1/groups/${updatedItem.id}/`, updatedItem);
                const index = this.list.findIndex((i) => i.id === updatedItem.id);
                if (index !== -1) {
                    this.list[index] = {...updatedItem};
                }
            } catch (error) {
                console.error("Failed to update group:", error);
            }
        },

        async deleteItem(id: number) {
            const {api} = useAxios();
            try {
                await api.delete(`/api/v1/groups/${id}/`);
                this.list = this.list.filter((i) => i.id !== id);
            } catch (error) {
                console.error("Failed to delete group:", error);
            }
        },

        resetItem() {
            Object.assign(this.item, this.defaultItem);
        }
    }
});
