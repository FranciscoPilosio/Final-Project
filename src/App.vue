<script setup>
import { useUserStore } from "./stores/user";
import Navbar from "./components/Navbar.vue";

const userStore = useUserStore();
</script>

<template>
  <header><Navbar /></header>
  <body>
    <div class="wrapper"></div>
  </body>
</template>

<style>
body {
  text-align: center;
}
</style>
