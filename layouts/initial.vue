<template>
  <v-app>
    <v-main class="background-image">
      <slot></slot>
    </v-main>
  </v-app>
</template>

<style scoped>
.background-image {
  background-image: url("/abstract.svg") !important;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
