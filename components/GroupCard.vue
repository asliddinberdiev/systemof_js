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
        <v-col>Day</v-col>
        <v-col class="text-end">{{ item.day }}</v-col>
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
