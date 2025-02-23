<template>
  <v-app>
    <v-app-bar elevation="2">
      <VAppBarTitle>
        <NuxtLink to="/">
          <TheLogo class="text-h5" />
        </NuxtLink>
      </VAppBarTitle>
    </v-app-bar>

    <v-main class="background-image">
      <slot></slot>
    </v-main>
  </v-app>
</template>

<style scoped>
/* .background-image {
  background-image: url("/public/bga.svg");
  background-repeat: initial;
}

.background-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
} */
</style>
