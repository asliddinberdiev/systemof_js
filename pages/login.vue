<script setup lang="ts">
import { useLogin } from "@/composables/useAuth";
import { useDisplay } from "vuetify";

const { name } = useDisplay();

definePageMeta({
  layout: "auth",
});

const { username, password, loading, submit } = useLogin();
</script>

<template>
  <v-card
    class="card-border-radius bg-grey-lighten-3 px-4 py-2"
    :min-width="name === 'xs' ? 300 : 500"
    rounded="xl"
  >
    <v-card-title class="font-weight-bold text-uppercase mb-4 text-center"
      >System Of Furqat</v-card-title
    >
    <form @submit.prevent="submit">
      <v-text-field
        v-model="username.value.value"
        :error-messages="username.errorMessage.value"
        rounded="xl"
        bg-color="grey-lighten-3"
        variant="solo"
        placeholder="username"
        prepend-inner-icon="mdi-account-outline"
      />
      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        :disabled="!!username.errorMessage.value || !username.value.value"
        rounded="xl"
        bg-color="grey-lighten-3"
        variant="solo"
        placeholder="password"
        prepend-inner-icon="mdi-lock-outline"
        type="password"
      />

      <v-btn
        :loading="loading"
        :disabled="
          !!password.errorMessage.value || !password.value.value || loading
        "
        class="my-4 text-white"
        color="primary"
        size="large"
        rounded="xl"
        block
        type="submet"
      >
        Login
      </v-btn>
    </form>
  </v-card>
</template>

<style>
.card-border-radius {
  box-shadow: -5px -5px 12px white, 5px 5px 10px rgba(0, 0, 0, 0.23) !important;
}
</style>
