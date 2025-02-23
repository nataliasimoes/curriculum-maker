<script setup lang="ts">
const languageStore = useCurriculumStore();
languageStore.setLanguages();
const currentPage = ref(0);
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center" class="h-screen">
      <v-col cols="12" md="5" class="mx-auto">
        <FormPage v-if="currentPage == 0" @next="currentPage++"></FormPage>
      </v-col>
    </v-row>
  </v-container>
</template>
