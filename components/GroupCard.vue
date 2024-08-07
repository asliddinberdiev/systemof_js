<script setup lang="ts">
import {toRefs} from "vue";
import type {GroupInterface} from "@/interfaces";

const props = defineProps({
  item: {
    type: Object as PropType<GroupInterface>,
    required: true,
  },
});
toRefs(props);
</script>

<template>
  <v-card class="GroupCard mx-auto rounded-lg" max-width="350" min-width="250">

    <v-card-title class="pt-4 text-center text-uppercase font-weight-bold">
      {{ item?.name }}
    </v-card-title>

    <v-card-text>
      <v-row no-gutters>
        <v-col>Day</v-col>
        <v-col class="text-end">{{ item.day ?'Odd':'Even' }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>Start Time</v-col>
        <v-col class="text-end">{{ item.start_time.slice(0, -3) }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>End Time</v-col>
        <v-col class="text-end">{{ item.end_time.slice(0, -3) }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.GroupCard {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.GroupCard:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
</style>