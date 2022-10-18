<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar bg-light">
    <div class="container-fluid">
      <RouterLink :to="{ name: `home` }" class="navbar-brand">
        <img
          src="src/assets/ironhack-1.svg"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        To Do List App
      </RouterLink>

      <div>
        <button type="button" class="btn btn-primary">
          <RouterLink :to="{ name: `LogIn` }">Log in</RouterLink>
        </button>
        <button type="button" class="btn btn-primary">
          <RouterLink class="underlineHover" :to="{ name: `SignUp` }"
            >Sing up</RouterLink
          >
        </button>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<style scoped></style>
