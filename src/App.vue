<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const activeTab = computed(() => {
  return route.name
})
</script>

<template>
  <img alt="Workline logo" class="logo" src="@/assets/workline.svg" width="125" height="125" />
  <div id="app">
    <div class="navbar">
      <nav>
        <RouterLink to="/" :class="{ active: activeTab === 'Home' }">Home</RouterLink> |
        <RouterLink to="/about" :class="{ active: activeTab === 'About' }">About</RouterLink> |
        <RouterLink to="/contacts" :class="{ active: activeTab === 'Contacts' }">Contacts</RouterLink>
      </nav>
    </div>
    <div :class="['tab-content', activeTab?.toString().toLowerCase()]">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
};
</script>

<style>
#app {
  text-align: center;
}

.logo {
  margin: 20px;
}

.navbar {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 2px solid #2196F3;
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

.tab-content {
  padding: 20px;
  border: 1px solid #2196F3;
  border-radius: 8px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.tab-content.home {
  background-color: #e0f7fa;
}

.tab-content.about {
  background-color: #f1f8e9;
}

.tab-content.contacts {
  background-color: #fbe9e7;
}

nav a.active {
  font-weight: bold;
  background-color: #2196F3;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a.active:hover {
  background-color: #1976d2;
}
</style>
