<script setup lang="ts">
import {onMounted} from "vue"
import {useGroupForm} from "@/composable/useGroup"

const {
  groupId,
  store,
  loading,
  isOpenModal,
  id,
  name,
  day,
  start_time,
  end_time,
  daySelectItems,
  fetchItem,
  Action,
  deleteAction
} = useGroupForm()

onMounted(async () => {
  if (+groupId.value !== 0) {
    await fetchItem(+groupId.value).then((res: any) => {
      if (!res) {
        id.value.value = store.item.id
        name.value.value = store.item.name
        day.value.value = store.item.day
        start_time.value.value = store.item.start_time.slice(0, -3)
        end_time.value.value = store.item.end_time.slice(0, -3)
      }
    })

  }
})

onUnmounted(() => store.$reset())

</script>

<template>
  <h1 class="text-center font-weight-bold" v-if="loading && +groupId !== 0">Loading...</h1>
  <v-container v-else-if="!loading || +groupId == 0">
    <v-form @submit.prevent="Action">
      <!-- inputs -->
      <v-row no-gutters>
        <!-- name, day -->
        <v-col cols="12">
          <v-row>
            <!-- name -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value"
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  label="Name"
                  placeholder="Name"
                  prepend-inner-icon="mdi-account-group"
              />
            </v-col>
            <!-- day -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-select
                  v-model="day.value.value"
                  :error-messages="day.errorMessage.value"
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  label="Day"
                  placeholder="Day"
                  prepend-inner-icon="mdi-calendar-today"
                  :items="daySelectItems"
                  item-value="value"
                  item-title="title"
              />
            </v-col>
          </v-row>
        </v-col>
        <!--  start_time and end_time  -->
        <v-col cols="12">
          <v-row>
            <!-- start_time -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  v-model="start_time.value.value"
                  :error-messages="start_time.errorMessage.value"
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  label="Start Time"
                  placeholder="Start Time"
                  prepend-inner-icon="mdi-timer-sand"
              />
            </v-col>
            <!-- end_time -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  v-model="end_time.value.value"
                  :error-messages="end_time.errorMessage.value"
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  label="End Time"
                  placeholder="End Time"
                  prepend-inner-icon="mdi-timer-sand-complete"
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
              :loading="loading && +groupId !== 0"
              class="my-4 text-white"
              color="primary"
              size="large"
              rounded="xl"
              block
              type="submet"
          >
            {{ +groupId === 0 ? 'Create' : 'Save' }}
          </v-btn>
        </v-col>
        <!-- delete btn -->
        <v-col v-if="+groupId !== 0">
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

