<template>
  <div class="hero">
    <div class="hero-image"></div>
    <div class="hero-overlay">
      <h1 class="hero-title">Мое портфолио</h1>
      <p class="hero-subtitle">Добро пожаловать на страницу моей работы</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Hero'
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*
   * Add your own background image by replacing the gradient below with
   * `background-image: url('@/image.png');` and placing a file at
   * `src/image.png`.
   */
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.7;
  z-index: -1;
}

.hero-overlay {
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(2px);
}

.hero-title {
  font-size: 3rem;
  margin: 0;
}

.hero-subtitle {
  margin: 0;
  font-size: 1.25rem;
}
</style>
