import {storeToRefs} from "pinia";
import {useGroupStore} from "@/store/group";
import {useField, useForm} from "vee-validate";
import type {FieldContext} from "vee-validate";

export function useGroup() {
    const store = useGroupStore();
    const {loading, list} = storeToRefs(store);
    const {fetchList} = store;

    return {loading, list, fetchList, store};
}

export function useGroupForm() {
    const router = useRouter()
    const route = useRoute()

    const store = useGroupStore();
    const {loading, item: group} = storeToRefs(store);
    const {fetchItem, createItem, updateItem, deleteItem} = store;

    const isOpenModal = ref(false)
    const daySelectItems = [
        {
            title: 'Odd',
            value: true
        },
        {
            title: 'Even',
            value: false
        },
    ]
    const groupId = computed(() => route.params.slug);
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

    // schema
    const schema = {
        name(value: string): boolean | string {
            if (!value) {
                return "Name is required.";
            }
            if (value.length < 3) {
                return "Name needs to be at least 3 characters.";
            }
            if (value.length > 20) {
                return "Name cannot exceed 20 characters.";
            }
            return true;
        },
        start_time(value: string): boolean | string {
            if (!value) {
                return "Start Time is required.";
            }
            if (!timeRegex.test(value)) {
                return 'Invalid time format';
            }
            return true;
        },
        end_time(value: string): boolean | string {
            if (!value) {
                return "End Time is required.";
            }
            if (!timeRegex.test(value)) {
                return 'Invalid time format';
            }
            return true;
        },
    }

    // useForm
    const {handleSubmit} = useForm({
        initialValues: group,
        validationSchema: schema,
    });

    const id: FieldContext<number> = useField("id")
    const name: FieldContext<string> = useField("name");
    const day: FieldContext<boolean> = useField("day");
    const start_time: FieldContext<string> = useField("start_time");
    const end_time: FieldContext<string> = useField("end_time");

    // create and update item
    const Action = handleSubmit(async (values: any) => {
        if (values.id === 0) {
            // create item
            try {
                await createItem({
                    id: values.id,
                    name: values.name,
                    day: values.day,
                    start_time: values.start_time,
                    end_time: values.end_time
                })
                await router.push("/groups")
            } catch (error) {
                console.log("useGroup - create: ", error)
            }
        } else {
            // update item
            try {
                await updateItem({
                    id: values.id,
                    name: values.name,
                    day: values.day,
                    start_time: values.start_time,
                    end_time: values.end_time
                })
                await router.push("/groups")
            } catch (error) {
                console.log("useGroup - update: ", error)
            }
        }
    });

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

    return {
        groupId,
        store,
        loading,
        isOpenModal,
        id,
        name,
        day,
        start_time,
        end_time,
        daySelectItems,
        fetchItem,
        Action,
        deleteAction,
        router
    };
}
