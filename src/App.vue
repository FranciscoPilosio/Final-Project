<script setup>
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "./stores/user";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar.vue";
import ToDo from "./views/Todo.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <header>
    <Navbar />
    <div class="wrapper"></div>
  </header>
</template>

<style>
header {
  text-align: center;
}
</style>
