<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";

interface Header {
  title: string;
  align?: string;
  sortable?: boolean;
  key: string;
}

// Reactive state
const search = ref("");
const dialog = ref(false);
const dialogDelete = ref(false);

const headers: Header[] = [
  { title: "Name", align: "start", key: "name" },
  { title: "Day", sortable: false, key: "day" },
  { title: "Start Time", sortable: false, key: "start_time" },
  { title: "End Time", sortable: false, key: "end_time" },
  { title: "Actions", sortable: false, key: "actions" },
];

const list = ref<Array<any>>([]);
const editedIndex = ref(-1);
const editedItem = reactive({
  name: "",
  day: "",
  start_time: "00:00",
  end_time: "00:00",
});
const defaultItem = reactive({
  name: "",
  day: "",
  start_time: "00:00",
  end_time: "00:00",
});

// Computed property
const formTitle = computed(() =>
  editedIndex.value === -1 ? "New Item" : "Edit Item"
);

// Computed property to filter list by search term
const filteredList = computed(() => {
  return list.value.filter((item) =>
  item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Watchers
watch(dialog, (val) => {
  if (!val) close();
});
watch(dialogDelete, (val) => {
  if (!val) closeDelete();
});

// Functions
const initialize = () => {
  list.value = [
    { name: "42-19", day: "Odd", start_time: "08:00", end_time: "10:00" },
    { name: "42-20", day: "Even", start_time: "10:00", end_time: "12:00" },
    { name: "42-21", day: "Even", start_time: "14:00", end_time: "16:00" },
    { name: "42-22", day: "Odd", start_time: "18:00", end_time: "20:00" },
  ];
};
const editItem = (item: any) => {
  editedIndex.value = list.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
};
const deleteItem = (item: any) => {
  editedIndex.value = list.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};
const deleteItemConfirm = () => {
  list.value.splice(editedIndex.value, 1);
  closeDelete();
};
const close = () => {
  dialog.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
};
const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
};
const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(list.value[editedIndex.value], editedItem);
  } else {
    list.value.push({ ...editedItem });
  }
  close();
};

onMounted(() => {
  initialize();
});
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
      <v-spacer />
      <div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              size="small"
              icon="mdi-plus"
              v-bind="props"
            />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Group name"
                    />
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.day" label="Day" />
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.start_time"
                      label="Start Time"
                    />
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.end_time"
                      label="End Time"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
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
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
              >
                OK
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="filteredList"
      :sort-by="[{ key: 'name', order: 'asc' }]"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

