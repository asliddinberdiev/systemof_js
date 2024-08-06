<script setup lang="ts">
import { toRefs } from "vue";
import type { PupilInterface } from "@/interfaces";
const props = defineProps({
  item: {
    type: Object as PropType<PupilInterface>,
    required: true,
  },
});
toRefs(props);
</script>

<template>
  <v-card class="glass-card mx-auto rounded-lg" min-width="250">
    <v-img
      class="mx-auto mt-4 rounded-circle"
      height="150"
      width="150"
      :src="item?.image"
      cover
    />

    <v-card-title class="pt-4 text-center text-uppercase font-weight-bold">
      {{ item?.firstname }} {{ item?.lastname }}
    </v-card-title>

    <v-card-text>
      <div class="d-flex flex-wrap justify-space-between">
        <h3>Group</h3>
        <h3 class="font-italic text-uppercase">{{ item?.group }}</h3>
      </div>
      <div class="d-flex flex-wrap justify-space-between">
        <h3>Pupil</h3>
        <h3 class="font-italic text-uppercase">
          <a
            class="text-black text-decoration-none"
            :href="`tel:+${item?.pupil_phone}`"
          >
            +{{ item?.pupil_phone }}
          </a>
        </h3>
      </div>
      <div class="d-flex flex-wrap justify-space-between">
        <h3>Parent</h3>
        <h3 class="font-italic text-uppercase">
          <a
            class="text-black text-decoration-none"
            :href="`tel:+${item?.parent_phone}`"
          >
            +{{ item?.parent_phone }}
          </a>
        </h3>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
</style>
<script setup lang="ts"></script>
