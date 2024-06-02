<template>
    <div class="detail-block">
      <div v-for="detail in details" :key="detail.name">
        <h3>{{ detail.name }}</h3>
        <p>{{ detail.description }}</p>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'DetailBlock',
    props: {
      details: {
        type: Array,
        required: true
      }
    }
  };
</script>