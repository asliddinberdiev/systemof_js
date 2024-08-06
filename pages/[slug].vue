<script setup lang="ts">
</script>

<template>
  <v-container>
    <v-form>
      <v-row no-gutters>
        <v-col cols="12">
          <v-file-input
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
        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  placeholder="First Name"
                  prepend-inner-icon="mdi-account"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  placeholder="Last Name"
                  prepend-inner-icon="mdi-account"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  placeholder="Pupil Phone"
                  prepend-inner-icon="mdi-phone"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                  rounded="xl"
                  bg-color="grey-lighten-3"
                  variant="solo"
                  placeholder="Parent Phone"
                  prepend-inner-icon="mdi-phone"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-select
              rounded="xl"
              bg-color="grey-lighten-3"
              variant="solo"
              placeholder="Group"
              prepend-inner-icon="mdi-account-group"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
