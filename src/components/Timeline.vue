<template>
  <div class="timeline">
    <TimelineItem 
      v-for="(item, index) in timelineItems" 
      :key="item.name" 
      :item="item" 
      :position="index % 2 === 0 ? 'left' : 'right'" 
    />
  </div>
</template>

<script setup lang="ts">
import '../assets/timeline.css';

import { storeToRefs } from 'pinia'
import { useTimelinesStore } from '../stores/timelines'
import TimelineItem from './TimelineItem.vue'

const store = useTimelinesStore()
const { timelines: timelineItems } = storeToRefs(store)
</script>
