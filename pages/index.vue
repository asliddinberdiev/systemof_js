<script setup lang="ts">
</script>

<template>
  <v-row class="d-grid py-2">
    <v-col v-for="(index,_) in 14" :key="index">
      <Pupil/>
    </v-col>
  </v-row>
</template>
