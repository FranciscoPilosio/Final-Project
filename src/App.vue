<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <header><Navbar /></header>
</template>

<style>
body {
  text-align: center;
  background-image: url("./assets/lighthouse-g46a1650fd_1280.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 400px) {
  body {
    text-align: center;
    background-image: url("./assets/lighthouse-g46a1650fd_1280.png");
    background-position: inherit;
    background-size: cover;
  }
}
</style>
