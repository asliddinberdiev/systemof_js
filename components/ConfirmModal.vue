<script setup lang="ts">
import {toRefs} from "vue";

const emits = defineEmits(["close"])

const props = defineProps({
  open: {
    type: Boolean as PropType<boolean>,
    default: false
  },
});
toRefs(props);

// action -> 0-close, 1-delete
function closeModal(action: number) {
  if (action === 0) {
    emits("close", action)
  } else {
    emits("close", action)
  }
}
</script>
<template>
  <div class="text-center pa-4">
    <v-dialog
        v-model="props.open"
        max-width="400"
        persistent
    >
      <v-card
          class="py-2"
      >
        <v-card-title class="text-center font-weight-bold">
          Are you sure you want to delete?
        </v-card-title>
        <template v-slot:actions>
          <v-row>
            <!-- no -->
            <v-col>
              <v-btn
                  @click="closeModal(0)"
                  class="text-white bg-primary text-white"
                  rounded="xl"
                  block
              >
                No
              </v-btn>
            </v-col>
            <!-- yes -->
            <v-col>
              <v-btn
                  @click="closeModal(1)"
                  class="bg-error text-white"
                  rounded="xl"
                  block
              >
                Yes
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
