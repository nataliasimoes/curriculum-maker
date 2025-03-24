<script setup lang="ts">
import { useTitle } from "@vueuse/core";

const title = useTitle("Profissio");
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <NuxtSnackbar />
  </NuxtLayout>
</template>

<style scoped>
.content {
  position: relative;
  z-index: 2;
}

::v-deep(.btn-green-text .v-btn__content) {
  color: #4caf50;
}
</style>
