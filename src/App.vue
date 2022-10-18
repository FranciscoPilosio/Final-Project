<script setup>
import { RouterLink, RouterView } from "vue-router";

import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "./stores/user";
import { store } from "./stores/store";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar.vue";
import ToDo from "./views/Todo.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      console.log("no estás logeado");
      // await userStore.signUp("user", "password");
      console.log(user.value);
    } else {
      console.log("estás logeado");
      console.log(user.value);
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <header>
    <Navbar />
    <div class="wrapper">
      <!-- <ToDo /> -->
      <!-- <ToDo v-if="store.state.user" /> -->
    </div>
  </header>
</template>

<style></style>
