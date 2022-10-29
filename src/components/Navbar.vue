<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const signOut = async function signOut() {
  userStore.singOut();

  console.log(userStore);
  userStore.user = null;
};
</script>

<template>
  <nav class="navbar bg-light pt-3 pb-3">
    <div class="container-fluid">
      <RouterLink :to="{ name: `home` }" class="navbar-brand" id="toDoList">
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
          <RouterLink class="underlineHover" :to="{ name: `LogIn` }"
            >Log in</RouterLink
          >
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
