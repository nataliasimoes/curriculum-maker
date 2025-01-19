<template>
  <v-app style="font-family: 'DM Sans'">
    <v-main class="main-container">
      <div class="background-image"></div>

      <div class="content">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/public/bga.svg");
  background-repeat: initial;
  opacity: 0.2;
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
}
</style>
