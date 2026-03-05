<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const activeTab = computed(() => route.name?.toString() ?? 'Home')
</script>

<template>
  <div class="app-shell min-vh-100">
    <header class="border-bottom bg-body-tertiary sticky-top shadow-sm">
      <nav class="navbar navbar-expand-lg container py-2">
        <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2">
          <img alt="Workline logo" class="rounded" src="@/assets/workline.svg" width="32" height="32" />
          <span class="fw-semibold">Workline Portfolio</span>
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="mainNav" class="collapse navbar-collapse justify-content-end">
          <div class="navbar-nav gap-lg-2">
            <RouterLink to="/" class="nav-link" :class="{ active: activeTab === 'Home' }">Home</RouterLink>
            <RouterLink to="/about" class="nav-link" :class="{ active: activeTab === 'About' }">About</RouterLink>
            <RouterLink to="/contacts" class="nav-link" :class="{ active: activeTab === 'Contacts' }">Contacts</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="container py-4 py-lg-5">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  background: radial-gradient(circle at 20% 20%, #f8f9fa, #e9f2ff 45%, #eef1ff);
}

.nav-link.active {
  font-weight: 600;
  color: var(--bs-primary) !important;
}
</style>
