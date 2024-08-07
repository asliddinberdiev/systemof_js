import {usePupilStore} from "@/store/pupil";
import {storeToRefs} from "pinia";
import {useGroupStore} from "@/store/group";
import {useToast} from "vue-toastification";

export function usePupil() {
    // Pupil Store
    const pupilStore = usePupilStore();
    const {loading, list} = storeToRefs(pupilStore);
    const {fetchList: pupilFetchList} = pupilStore;

    // Group Store
    const groupStore = useGroupStore();
    const {fetchList: groupFetchList, getGroupWithName} = groupStore;

    return {loading, list, getGroupWithName, pupilFetchList, groupFetchList, pupilStore, groupStore};
}

export function usePupilForm() {
    const toast = useToast()
    const route = useRoute()
    const pupilId = computed(() => route.params.slug);

    const pupilStore = usePupilStore();
    const {loading, item: pupil} = storeToRefs(pupilStore);
    const {fetchItem} = pupilStore;

    const groupStore = useGroupStore();
    const {getGroupListWithName} = storeToRefs(groupStore);
    const {fetchList: groupFetchList} = groupStore;

    function Action() {
        if (pupil.value.id === 0) {
            toast.success("created")
        } else {
            toast.success("updated")
        }
    }

    return {
        loading,
        pupilId,
        getGroupListWithName,
        pupil,
        groupFetchList,
        fetchItem,
        Action,
    };
}
