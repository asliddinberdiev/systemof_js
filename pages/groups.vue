<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";
import {useGroup} from "@/composable/useGroup";

const {
  loading,
  fetchGroupList,
  editItem,
  headers,
  deleteItem,
  search,
  filteredList,
  dialog,
  formTitle,
  close,
  save,
  dialogDelete,
  closeDelete,
  deleteItemConfirm,
  store
} = useGroup();

onMounted(async () => {
  await fetchGroupList();
});

onUnmounted(() => store.$reset());
</script>


<template>
  <v-data-table
      :loading="loading"
      :headers="headers"
      :items="filteredList"
      :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchGroupList"> Reset</v-btn>
    </template>
  </v-data-table>
</template>
