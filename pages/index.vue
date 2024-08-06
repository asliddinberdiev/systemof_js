<script setup lang="ts">
import { onMounted } from "vue";
import { usePupil } from "@/composable/usePupil";
const { loading, list, fetchList, store } = usePupil();

onMounted(async () => {
  await fetchList();
});
onUnmounted(() => store.$reset());
</script>
<template>
  <v-skeleton-loader v-if="loading" :loading="loading" type="card" />

  <h1 v-else-if="list.length === 0" class="text-center">Empty</h1>

  <v-row v-else class="d-grid py-2">
    <v-col v-for="(item, index) in list" :key="index">
      <PupilCard :item="item" />
    </v-col>
  </v-row>
</template>
