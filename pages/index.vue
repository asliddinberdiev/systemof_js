<script setup lang="ts">
import {onMounted} from "vue";
import {usePupil} from "@/composable/usePupil";

const {loading, list, getGroupWithName, pupilFetchList, groupFetchList, pupilStore, groupStore} = usePupil();

const listComputed = computed(() => list.value.map(item => ({...item, group: getGroupWithName(+item.group)})))

onMounted(async () => {
  await pupilFetchList();
  await groupFetchList();
});
onUnmounted(() => {
  pupilStore.$reset()
  groupStore.$reset()
});
</script>
<template>
  <h1 class="text-center font-weight-bold" v-if="loading">Loading...</h1>

  <v-row v-else-if="!loading && list.length > 0" class="d-grid py-2">
    <v-col v-for="(item, index) in listComputed" :key="index">
      <PupilCard @click.stop="navigateTo(`/${item.id}`)" :item="item"/>
    </v-col>
  </v-row>

  <h1 v-else class="text-center">Empty</h1>

</template>
