<script setup lang="ts">
definePageMeta({
  layout: "initial",
});
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center">
      <v-col cols="12" xs="12" md="6" lg="6">
        <v-row>
          <v-col>
            <h1 class="mulish-font responsive-text">Profissio</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" md="9">
            <span class="inter-font responsive-text">
              Precisa de um currículo rápido e sem dor de cabeça? É só preencher
              o formulário com suas informações e baixá-lo em PDF prontinho e
              formatado para você. Ah, e pode ficar tranquilo: seus dados não
              ficam armazenados, garantindo total privacidade e segurança!
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center text-sm-left">
            <v-btn
              rounded="xl"
              size="large"
              color="green"
              variant="outlined"
              class="inter-font"
              to="/form"
            >
              COMEÇAR
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" md="6" lg="6">
        <VImg cover src="/public/resume.svg"></VImg>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <span class="inter-font-mini"> © 2025 Natália Simões | Credits </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");
* {
  color: white !important;
}

.inter-font {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
}

.inter-font-mini {
  font-family: "Inter", sans-serif;
  font-size: 12px !important;
  font-weight: 200;
  font-style: normal;
}

.mulish-font {
  font-family: "Mulish", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
}

h1 {
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 600;
}

.responsive-text {
  text-align: left;
}

@media (max-width: 960px) {
  .responsive-text {
    text-align: center;
    display: block;
  }
}
</style>
