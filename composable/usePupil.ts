import { usePupilStore } from "@/store/pupil";
import { storeToRefs } from "pinia";
import { useGroupStore } from "@/store/group";
import { useToast } from "vue-toastification";
import { useField, useForm } from "vee-validate";
import type { FieldContext } from "vee-validate";

export function usePupil() {
  // Pupil Store
  const pupilStore = usePupilStore();
  const { loading, list } = storeToRefs(pupilStore);
  const { fetchList: pupilFetchList } = pupilStore;

  // Group Store
  const groupStore = useGroupStore();
  const { fetchList: groupFetchList, getGroupWithName } = groupStore;

  return {
    loading,
    list,
    getGroupWithName,
    pupilFetchList,
    groupFetchList,
    pupilStore,
    groupStore,
  };
}

export function usePupilForm() {
  const toast = useToast();
  const router = useRouter();
  const route = useRoute();
  const pupilId = computed(() => route.params.slug);

  const pupilStore = usePupilStore();
  const { loading, item: pupil } = storeToRefs(pupilStore);
  const { fetchItem, updateItem, createItem, deleteItem } = pupilStore;

  const groupStore = useGroupStore();
  const { getGroupListWithName } = storeToRefs(groupStore);
  const { fetchList: groupFetchList } = groupStore;

  const isOpenModal = ref(false);
  const userImageFile = ref();
  const phoneNumberRegex = /^998(20|33|77|88|90|91|93|94|97|98|99)\d{7}$/;
  // schema
  const schema = {
    firstname(value: string): boolean | string {
      if (!value) {
        return "First Name is required.";
      }
      if (value.length < 3) {
        return "First Name needs to be at least 3 characters.";
      }
      if (value.length > 30) {
        return "First Name cannot exceed 30 characters.";
      }
      return true;
    },
    lastname(value: string): boolean | string {
      if (!value) {
        return "Last Name is required.";
      }
      if (value.length < 3) {
        return "Last Name needs to be at least 3 characters.";
      }
      if (value.length > 30) {
        return "Last Name cannot exceed 30 characters.";
      }
      return true;
    },
    pupil_phone(value: string): boolean | string {
      if (!value) {
        return "Pupil phone number is required.";
      }
      if (!phoneNumberRegex.test(value)) {
        return "Invalid phone number format";
      }
      return true;
    },
    parent_phone(value: string): boolean | string {
      if (!value) {
        return "Parent phone number is required.";
      }
      if (!phoneNumberRegex.test(value)) {
        return "Invalid phone number format";
      }
      return true;
    },
    group(value: string): boolean | string {
      if (!value) {
        return "Group is required.";
      }
      return true;
    },
  };

  // useForm
  const { handleSubmit } = useForm({
    initialValues: pupil,
    validationSchema: schema,
  });

  const id: FieldContext<number> = useField("id");
  const firstname: FieldContext<string> = useField("firstname");
  const lastname: FieldContext<string> = useField("lastname");
  const pupil_phone: FieldContext<string> = useField("pupil_phone");
  const parent_phone: FieldContext<string> = useField("parent_phone");
  const group: FieldContext<string | number> = useField("group");
  const image: FieldContext<string> = useField("image");

  // create and update
  const Action = handleSubmit(async (values: any) => {
    let formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("pupil_phone", values.pupil_phone);
    formData.append("parent_phone", values.parent_phone);
    formData.append("group", values.group);
    userImageFile.value && formData.append("image", userImageFile.value)

    if (pupil.value.id === 0) {
      if (!userImageFile.value) {
        toast.error("Image is required");
      } else {
        try {
          await createItem(formData);
          await router.push("/");
        } catch (error) {
          console.log("usePupil - create: ", error);
        }
      }
    } else {
      try {
        await updateItem(pupil.value.id, formData);
        await router.push("/");
      } catch (error) {
        console.log("usePupil - update: ", error);
      }
    }
  });

  // delete item
  async function deleteAction(action: number) {
    isOpenModal.value = false;
    if (action === 1) {
      await deleteItem(pupil.value.id).then(() => router.push("/"));
    }
  }

  // user image uploaded
  function fileUpload(file: File) {
    userImageFile.value = file;
  }

  return {
    pupilStore,
    groupStore,
    isOpenModal,
    loading,
    pupilId,
    getGroupListWithName,
    id,
    firstname,
    lastname,
    pupil_phone,
    parent_phone,
    group,
    image,
    groupFetchList,
    fetchItem,
    fileUpload,
    Action,
    deleteAction,
    router,
  };
}
