<template>
    <div class="contact-item">
        <h2>Type: {{ contact.type }}</h2>
        <p>Value: {{ contact.value }}</p>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ContactItem',
    props: {
        contact: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.contact-item {
  background: #fff;
  border-radius: 6px;
  padding: 10px 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}
</style>