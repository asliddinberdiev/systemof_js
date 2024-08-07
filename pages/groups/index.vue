<script setup lang="ts">
import {onMounted} from "vue";
import {useGroup} from "@/composable/useGroup";

const {loading, list, fetchList, store} = useGroup();

onMounted(async () => {
  await fetchList();
});
onUnmounted(() => store.$reset());
</script>

<template>
  <h1 class="text-center font-weight-bold" v-if="loading">Loading...</h1>

  <v-row v-else-if="!loading && list.length > 0" class="d-grid py-2">
    <v-col v-for="(item, index) in list" :key="index">
      <GroupCard @click.stop="navigateTo(`/groups/${item.id}`)" :item="item"/>
    </v-col>
  </v-row>

  <h1 v-else class="text-center">Empty</h1>

</template>
