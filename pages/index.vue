<script setup lang="ts">
import { ref } from "vue";

const base_url = "https://agsu.pythonanywhere.com"
const token = ref<string>("");
const refresh = ref<string>("");
await useFetch(`${base_url}/auth/login/`, {
  method: "post",
  body: { username: "go", password: "go" },
}).then(({data}) => {
  token.value = data.value?.access;
  refresh.value = data.value?.refresh;
});
</script>

<template>
  <div>index page</div>
</template>
