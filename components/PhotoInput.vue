<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { PropType } from "vue";

const emits = defineEmits(["photo"]);
const props = defineProps({
  path: {
    type: String as PropType<string>,
    default: "",
  },
});
toRefs(props);

const url = ref<any>("");
const imgFile = ref();

const defaultImgUrl = "/images/default-user.webp";

watch(props, (newVal) => (url.value = newVal.path));
watch(imgFile, (newVal) => emits("photo", newVal));

function uploadPhoto(event: any) {
  if (event.target.value.length) {
    imgFile.value = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => (url.value = reader.result));
    reader.readAsDataURL(event.target.files[0]);
  }
}

onMounted(() => !props.path.length && (url.value = defaultImgUrl));
</script>

<template>
  <div class="p-4">
    <label for="photo-input" class="d-inline-block">
      <v-img
        class="mx-auto rounded-circle border cursor-pointer"
        :src="url"
        width="200"
        height="200"
        cover
      />
    </label>
    <v-file-input
      v-model="imgFile"
      class="d-none"
      id="photo-input"
      accept="image/png, image/jpeg, image/jpg, image/webp"
      @change="uploadPhoto"
    />
  </div>
</template>
