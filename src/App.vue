<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <img alt="Workline logo" class="logo" src="@/assets/workline.svg" width="125" height="125" />
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink> |
      <RouterLink to="/contacts">Contacts</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
};
</script>

<style>
nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
