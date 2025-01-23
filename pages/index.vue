<script setup lang="ts">
const languageStore = useCurriculumStore();
languageStore.setLanguages();
const currentPage = ref(0);
</script>

<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="h-screen">
      <v-col cols="12" md="6" class="mx-auto">
        <FormPage v-if="currentPage == 0" @next="currentPage++"></FormPage>
      </v-col>
    </v-row>
  </v-container>
</template>
