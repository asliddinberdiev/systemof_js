<script setup lang="ts">
import {onMounted, onUnmounted} from "vue"
import {usePupilForm} from "@/composable/usePupil"
import {useToast} from "vue-toastification";

const toast = useToast()
const {
  pupilStore,
  groupStore,
  isOpenModal,
  loading,
  groupFetchList,
  getGroupListWithName: list,
  id,
  firstname,
  lastname,
  pupil_phone,
  parent_phone,
  group,
  image,
  pupilId,
  fetchItem,
  fileUpload,
  Action,
  deleteAction,
  router,
} = usePupilForm()

onMounted(async () => {
  await groupFetchList()
  if (list.value.length === 0) {
    toast.warning("Group does not exist so create a group first")
    await router.push('/groups');
  } else if (+pupilId.value !== 0) {
    try {
      await fetchItem(+pupilId.value).then((res: any) => {
        if (!res) {
          id.value.value = pupilStore.item.id
          firstname.value.value = pupilStore.item.firstname
          lastname.value.value = pupilStore.item.lastname
          pupil_phone.value.value = pupilStore.item.pupil_phone
          parent_phone.value.value = pupilStore.item.parent_phone
          group.value.value = pupilStore.item.group
          image.value.value = pupilStore.item.image
        }
      })
    } catch (error: any) {
      if (error?.response?.status === 404) {
        await router.push('/pupils');
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }

  if (+pupilId.value !== 0) await fetchItem(+pupilId.value)
})

onUnmounted(() => {
  pupilStore.$reset();
  groupStore.$reset()
})
</script>

<template>
  <h1 class="text-center font-weight-bold" v-if="loading && +pupilId !== 0">Loading...</h1>
  <v-container v-else-if="!loading || +pupilId == 0">
    <v-form @submit.prevent="Action">
      <v-row no-gutters>
        <!-- image, pupil_phone, parent_phone, group -->
        <v-col cols="12">
          <v-row>
            <!-- image -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <PhotoInput :path="image.value.value" @photo="fileUpload"/>
            </v-col>
            <!-- pupil_phone, parent_phone, group -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-row no-gutters>
                <!-- pupil_phone -->
                <v-col cols="12">
                  <v-text-field
                      v-model="pupil_phone.value.value"
                      :error-messages="pupil_phone.errorMessage.value"
                      rounded="xl"
                      bg-color="grey-lighten-3"
                      variant="solo"
                      label="Pupil phone"
                      placeholder="Pupil phone"
                      prepend-inner-icon="mdi-phone"
                  />
                </v-col>
                <!-- parent_phone -->
                <v-col cols="12">
                  <v-text-field
                      v-model="parent_phone.value.value"
                      :error-messages="parent_phone.errorMessage.value"
                      rounded="xl"
                      bg-color="grey-lighten-3"
                      variant="solo"
                      label="Pupil phone"
                      placeholder="Parent phone"
                      prepend-inner-icon="mdi-phone"
                  />
                </v-col>
                <!-- group -->
                <v-col cols="12">
                  <v-select
                      v-model="group.value.value"
                      :error-messages="group.errorMessage.value"
                      rounded="xl"
                      bg-color="grey-lighten-3"
                      variant="solo"
                      label="Group"
                      placeholder="Group"
                      prepend-inner-icon="mdi-account-group"
                      :items="list"
                      item-value="id"
                      item-title="name"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <!--  firstname and lastname  -->
        <v-col cols="12">
          <v-row>
            <!-- firstname -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  v-model="firstname.value.value"
                  :error-messages="firstname.errorMessage.value"
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  label="First Name"
                  placeholder="First Name"
                  prepend-inner-icon="mdi-account"
              />
            </v-col>
            <!-- lastname -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  v-model="lastname.value.value"
                  :error-messages="lastname.errorMessage.value"
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  label="Last Name"
                  placeholder="Last Name"
                  prepend-inner-icon="mdi-account"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- btns -->
      <v-row>
        <!-- create-update btn -->
        <v-col>
          <v-btn
              class="my-4 text-white"
              color="primary"
              size="large"
              rounded="xl"
              block
              type="submet"
          >
            {{ +pupilId === 0 ? 'Create' : 'Save' }}
          </v-btn>
        </v-col>
        <!-- delete btn -->
        <v-col v-if="+pupilId !== 0">
          <v-btn
              @click="isOpenModal = true"
              class="my-4 text-white"
              color="error"
              size="large"
              rounded="xl"
              block
          >
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <ConfirmModal :open="isOpenModal" @close="deleteAction"/>
</template>
