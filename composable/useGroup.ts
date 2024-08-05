// composable/useGroup.ts
import { ref, computed, watch, nextTick } from 'vue';
import { useGroupStore } from '~/stores/group';
import { useToast } from 'vue-toastification';

export function useGroup() {
    const store = useGroupStore();
    const toast = useToast();

    const search = ref("");
    const dialog = ref(false);
    const dialogDelete = ref(false);

    interface Header {
        title: string;
        align?: string;
        sortable?: boolean;
        key: string;
    }

    const headers: Header[] = [
        { title: "Name", align: "start", key: "name" },
        { title: "Day", sortable: false, key: "day" },
        { title: "Start Time", sortable: false, key: "start_time" },
        { title: "End Time", sortable: false, key: "end_time" },
        { title: "Actions", sortable: false, key: "actions" },
    ];

    const formTitle = computed(() =>
        store.item.id === 0 ? "New Item" : "Edit Item"
    );

    const filteredList = computed(() => {
        return store.list.filter((item) =>
            item.name.toLowerCase().includes(search.value.toLowerCase())
        );
    });

    watch(dialog, (val) => {
        if (!val) close();
    });
    watch(dialogDelete, (val) => {
        if (!val) closeDelete();
    });

    const editItem = (item: any) => {
        Object.assign(store.item, item);
        dialog.value = true;
    };

    const deleteItem = (item: any) => {
        Object.assign(store.item, item);
        dialogDelete.value = true;
    };

    const deleteItemConfirm = async () => {
        try {
            await store.deleteItem(store.item.id);
            toast.warning("Deleted group!");
            closeDelete();
        } catch (error) {
            toast.error("Failed to delete group");
        }
    };

    const close = () => {
        dialog.value = false;
        nextTick(() => {
            store.resetItem();
        }).then();
    };

    const closeDelete = () => {
        dialogDelete.value = false;
        nextTick(() => {
            store.resetItem();
        }).then();
    };

    const save = async () => {
        try {
            if (store.item.id > 0) {
                await store.updateItem(store.item);
                toast.success("Updated group!");
            } else {
                await store.createItem(store.item);
                toast.success("Created group!");
            }
            close();
        } catch (error) {
            toast.error("Failed to save group");
        }
    };

    return {
        loading: store.loading,
        fetchGroupList: store.fetchList,
        editItem,
        headers,
        deleteItem,
        search,
        filteredList,
        dialog,
        formTitle,
        close,
        save,
        dialogDelete,
        closeDelete,
        deleteItemConfirm,
        store
    };
}
