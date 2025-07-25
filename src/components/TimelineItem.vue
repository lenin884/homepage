<template>
  <div
    :class="['timeline-item-wrapper', top ? 'top' : 'bottom']"
    :style="{ '--offset': (top ? -offset : offset) + 'px' }"
  >
    <div class="timeline-dot" @click="toggleDetails"></div>
    <div :class="['timeline-item', { expanded: showDetails }]">
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
    item: Object,
    top: Boolean
  },
  data() {
    return {
      showDetails: false,
      offset: Math.floor(Math.random() * 40) + 10
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
  }
};
</script>
