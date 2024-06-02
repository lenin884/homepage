<template>
    <div class="timeline">
      <TimelineItem v-for="item in timelineItems" :key="item.name" :item="item" />
    </div>
</template>
  
<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useTimelinesStore } from '../stores/timelines'
  import TimelineItem from './TimelineItem.vue'
  
  const store = useTimelinesStore()
  const { timelines: timelineItems } = storeToRefs(store)

</script>