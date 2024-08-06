<script setup lang="ts">
import { onMounted } from "vue";
import { useGroup } from "@/composable/useGroup";
const { loading, list, fetchList, store } = useGroup();

onMounted(async () => {
  await fetchList();
  console.log(list.value);
});
onUnmounted(() => store.$reset());
</script>

<template>
  <v-skeleton-loader v-if="loading" :loading="loading" type="card" />

  <h1 v-else-if="list.length === 0" class="text-center">Empty</h1>
  
  <v-row v-else class="d-grid py-2">
    <v-col v-for="(item, index) in list" :key="index">
      <GroupCard :item="item" />
    </v-col>
  </v-row>
</template>
