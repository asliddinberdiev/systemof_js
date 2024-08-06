<script setup lang="ts">
</script>

<template>
  <div class="d-grid ga-2">
    <v-row>
      <v-col v-for="(index,_) in 14" :key="index">
        <Pupil/>
      </v-col>
    </v-row>
  </div>
</template>
