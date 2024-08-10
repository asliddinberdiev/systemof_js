<script setup>
import {ref, computed} from "vue";
import {useLogout} from "@/composable/useAuth";
import {useMainStore} from "@/store"
import {usePupilStore} from "@/store/pupil";
import {storeToRefs} from "pinia";

const pupilStore = usePupilStore();
const {fetchExcel} = usePupilStore();
const {excelUrl, list: pupilList} = storeToRefs(pupilStore)

const store = useMainStore();
const {appName, search, loading} = storeToRefs(store)

const {menuActions} = useLogout();
const router = useRouter()
const route = useRoute();

const drawer = ref(false);
const isSearch = computed(() => !route.params.slug)

const menuList = [
  {
    icon: "mdi-account-school",
    title: "Pupils",
    color: "primary",
    path: "/",
  },
  {
    icon: "mdi-account-group",
    title: "Groups",
    color: "green",
    path: "/groups",
  },
];

function addBtnAction() {
  if (route.name === "index") navigateTo("/0")
  else navigateTo("/groups/0")
}

const getExcel = async () => {
  await fetchExcel();

  if (excelUrl.value) {
    const a = document.createElement('a');
    a.href = excelUrl.value;
    a.download = 'pupils_list.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}


function backAction() {
  router.back()
}

function swipe(direction) {
  if (direction === "right") drawer.value = true
  if (direction === "left") drawer.value = false
}

</script>
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-sheet
          class="pa-4 d-flex flex-column justify-center align-center"
          color="grey-lighten-4"
      >
        <v-avatar lass="mb-4" color="primary" size="80">
          <span class="text-h3">F</span>
        </v-avatar>
      </v-sheet>

      <v-divider/>

      <v-list density="compact">
        <v-list-item
            v-for="{ icon, title, color, path } in menuList"
            :key="icon"
            :title="title"
            link
            @click="navigateTo(path)"
        >
          <template v-slot:prepend>
            <v-icon :icon="icon" :color="color"/>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon v-if="!drawer" @click="drawer = !drawer"/>
      <v-app-bar-title>
        {{ appName.toUpperCase() }}
        <v-btn
            v-if="!!route.params.slug"
            @click="backAction"
            icon="mdi-arrow-left-bold"
            color="primary"
            variant="plain"/>
      </v-app-bar-title>
      <v-spacer/>
      <v-btn
          icon="mdi-logout"
          class="bg-primary mr-4"
          color="white"
          size="small"
          @click="menuActions('login')"
      />
    </v-app-bar>

    <v-main
        v-touch="{
      left: () => swipe('left'),
      right: () => swipe('right'),
    }" class="overflow-y-hidden h-screen pb-0">
      <v-card v-if="isSearch" class="mt-3" flat>
        <v-card-title class="d-flex align-center">
          <v-text-field
              v-model.trim="search"
              :loading="loading"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
              color="white"
              class="mr-3 mr-sm-12"
          >
            <template v-slot:loader>
              <v-progress-linear
                  :active="loading"
                  color="primary"
                  height="4"
                  indeterminate
              />
            </template>
          </v-text-field>
          <v-btn :disabled="pupilList.length === 0" v-if="route.name === 'index'" color="primary" size="small" icon="mdi-download" class="mr-6"
                 @click="getExcel"/>
          <v-btn color="primary" size="small" icon="mdi-plus" @click="addBtnAction"/>
        </v-card-title>
      </v-card>
      <v-container class="px-6 overflow-y-scroll h-100" fluid>
        <NuxtPage/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f1f1f1;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #2c71c5;
}
</style>