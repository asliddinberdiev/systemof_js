import {storeToRefs} from "pinia";
import {useGroupStore} from "@/store/group";
import {useToast} from "vue-toastification";
import router from "#app/plugins/router";

export function useGroup() {
    const store = useGroupStore();
    const {loading, list} = storeToRefs(store);
    const {fetchList} = store;
    return {loading, list, fetchList, store};
}

export function useGroupForm() {
    const toast = useToast()
    const router = useRouter()
    const route = useRoute()

    const store = useGroupStore();
    const {loading, item: group} = storeToRefs(store);
    const {fetchItem, createItem, updateItem, deleteItem} = store;

    const isOpenModal = ref(false)
    const groupId = computed(() => route.params.slug);

    // create and update item
    async function Action() {
        if (group.value.id === 0) {
            // create item
            try {
                await createItem({
                    id: group.value.id,
                    name: group.value.name,
                    day: group.value.day,
                    start_time: group.value.start_time,
                    end_time: group.value.end_time
                })
                await router.push("/groups")
            } catch (error) {
                console.log("useGroup - create: ", error)
            }
        } else {
            // update item
            try {
                await updateItem({
                    id: group.value.id,
                    name: group.value.name,
                    day: group.value.day,
                    start_time: group.value.start_time,
                    end_time: group.value.end_time
                })
                await router.push("/groups")
            } catch (error) {
                console.log("useGroup - update: ", error)
            }
        }
    }

    // delete item
    async function deleteAction(action: number) {
        isOpenModal.value = false
        if (action === 1) {
            await deleteItem(group.value.id)
                .then(() => {
                    router.push("/groups")
                })
        }
    }

    return {loading, isOpenModal, group, groupId, fetchItem, Action, deleteAction};
}
