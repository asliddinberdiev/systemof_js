<template>
  <v-card class="glass-card mx-auto rounded-lg" min-width="250">
    <v-img
        lazy-src="/img/user.webp"
        class="mx-auto mt-4 rounded-circle"
        height="150"
        width="150"
        src="https://parade.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk5OTYwMjQzOTg2MjQ1MjQ4/selena-gomez-health.jpg"
        cover
    />

    <v-card-title class="pt-4 text-center text-uppercase font-weight-bold">
      Selena Gomez
    </v-card-title>

    <v-card-text>
      <div class="d-flex flex-wrap justify-space-between">
        <h3>Group</h3>
        <h3 class="font-italic text-uppercase">42-19ab</h3>
      </div>
      <div class="d-flex flex-wrap justify-space-between">
        <h3>Pupil</h3>
        <h3 class="font-italic text-uppercase">
          <a class="text-black text-decoration-none" href="tel:+998901202124">+998901202124</a>
        </h3>
      </div>
      <div class="d-flex flex-wrap justify-space-between">
        <h3>Parent</h3>
        <h3 class="font-italic text-uppercase">
          <a class="text-black text-decoration-none" href="tel:+998904262233">+998904262233</a>
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
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
</style>
<script setup lang="ts">
</script>