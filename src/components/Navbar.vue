<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const signOut = async function signOut() {
  userStore.singOut();
  userStore.user = null;
};
</script>

<template>
  <nav class="navbar bg-light pt-3 pb-3">
    <div class="container-fluid">
      <RouterLink :to="{ name: `home` }" class="navbar-brand" id="toDoList">
        <!-- <img
          src="src/assets/ironhack-1.svg"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        /> -->
        To Do List App
      </RouterLink>
      <div>
        <button
          v-if="userStore.user != null"
          type="button"
          class="btn btn-primary"
          @click="signOut"
        >
          <RouterLink :to="{ name: `LogIn` }">Log out</RouterLink>
        </button>
      </div>

      <div v-if="userStore.user === null">
        <button type="button" class="btn btn-primary me-3">
          <RouterLink :to="{ name: `LogIn` }">Log in</RouterLink>
        </button>
        <button type="button" class="btn btn-primary me-3">
          <RouterLink class="underlineHover" :to="{ name: `SignUp` }"
            >Sign up</RouterLink
          >
        </button>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<style scoped>
button a {
  color: white;
}
</style>
