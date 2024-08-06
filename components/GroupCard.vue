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
  <v-card class="glass-card mx-auto rounded-lg" min-width="200">

    <v-card-title class="pt-4 text-center text-uppercase font-weight-bold">
      {{ item?.name }}
    </v-card-title>

    <v-card-text>
      <v-row no-gutters>
        <v-col class="text-center">Day</v-col>
        <v-col class="text-center">{{ item.day }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="text-center">Start Time</v-col>
        <v-col class="text-center">{{ item.start_time.slice(0, 5) }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="text-center">End Time</v-col>
        <v-col class="text-center">{{ item.end_time.slice(0, 5) }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
