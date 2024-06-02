<template>
    <div class="timeline-item" @click="toggleDetails">
      <h2>{{ item.name }}</h2>
      <p>{{ item.description }}</p>
      <DetailBlock v-if="showDetails" :details="item.details" />
    </div>
  </template>
  
  <script>
  import DetailBlock from './DetailBlock.vue';
  
  export default {
    name: 'TimelineItem',
    components: {
      DetailBlock
    },
    props: {
      item: Object
    },
    data() {
      return {
        showDetails: false
      };
    },
    methods: {
      toggleDetails() {
        this.showDetails = !this.showDetails;
      }
    }
  };
  </script>