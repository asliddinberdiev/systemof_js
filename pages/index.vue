<script setup lang="ts">
const {menuActions} = useLogout()
</script>

<template>
  <v-btn

      class="my-4 text-white"
      color="cyan"
      size="large"
      rounded="xl"
      block
      @click="menuActions('login')"
  >
    LOGOUT
  </v-btn>
</template>
