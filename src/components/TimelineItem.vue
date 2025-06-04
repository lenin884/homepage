<template>
  <div class="timeline-item-wrapper">
    <div class="timeline-dot" @click="toggleDetails"></div>
    <div class="timeline-item">
      <h2>{{ item.name }}</h2>
      <p>{{ item.description }}</p>
      <DetailBlock v-if="showDetails" :details="item.details" />
    </div>
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
