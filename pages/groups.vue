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
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2 mb-4">
      <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          color="white"
      />
      <v-spacer/>
      <div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" size="small" icon="mdi-plus" v-bind="props"/>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="store.item.name" label="Group name"/>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="store.item.day" label="Day"/>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="store.item.start_time" label="Start Time"/>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="store.item.end_time" label="End Time"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-title>

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
  </v-card>
</template>
