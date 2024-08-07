<script setup lang="ts">
import {onMounted} from "vue"
import {usePupilForm} from "@/composable/usePupil"

const {loading, groupFetchList, getGroupListWithName: list, pupil, pupilId, fetchItem, Action} = usePupilForm()

onMounted(async () => {
  if (+pupilId.value !== 0) await fetchItem(+pupilId.value)
  await groupFetchList()
})
</script>

<template>
  <h1 class="text-center font-weight-bold" v-if="loading && +pupil.id !== 0">Loading...</h1>
  <v-container v-else>
    <v-form @submit.prevent="Action">
      <v-row no-gutters>
        <!-- image, pupil_phone, parent_phone, group -->
        <v-col cols="12">
          <v-row>
            <!-- image -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-img class="mx-auto rounded-circle" :src="pupil.image" width="200" height="200" cover/>
              <v-file-input
                  v-if="false"
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  label="User image"
                  show-size
                  prepend-icon=""
                  prepend-inner-icon="mdi-camera"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
              />
            </v-col>
            <!-- pupil_phone, parent_phone, group -->
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-row no-gutters>
                <!-- pupil_phone -->
                <v-col cols="12">
                  <v-text-field
                      v-model="pupil.pupil_phone"
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
                      v-model="pupil.parent_phone"
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
                      v-model="pupil.group"
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
                  v-model="pupil.firstname"
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
                  v-model="pupil.lastname"
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
            {{ pupil.id === 0 ? 'Create' : 'Save' }}
          </v-btn>
        </v-col>
        <!-- delete btn -->
        <v-col v-if="pupil.id > 0">
          <v-btn
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
</template>
