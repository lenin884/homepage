<template>
  <div
    class="timeline-horizontal"
    ref="container"
    @mousedown="dragStart"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
    @wheel.prevent="onWheel"
  >
    <TimelineItem
      v-for="item in timelineItems"
      :key="item.name"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import '../assets/timeline.css';

import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTimelinesStore } from '../stores/timelines'
import TimelineItem from './TimelineItem.vue'

const store = useTimelinesStore()
const { timelines: timelineItems } = storeToRefs(store)

const container = ref<HTMLElement | null>(null)
const isDown = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

function dragStart(e: MouseEvent) {
  isDown.value = true
  container.value?.classList.add('active')
  startX.value = e.pageX - (container.value?.offsetLeft || 0)
  scrollLeft.value = container.value?.scrollLeft || 0
}

function dragMove(e: MouseEvent) {
  if (!isDown.value) return
  e.preventDefault()
  const x = e.pageX - (container.value?.offsetLeft || 0)
  const walk = x - startX.value
  if (container.value) {
    container.value.scrollLeft = scrollLeft.value - walk
  }
}

function dragEnd() {
  isDown.value = false
  container.value?.classList.remove('active')
}

function onWheel(e: WheelEvent) {
  if (container.value) {
    container.value.scrollLeft += e.deltaY
  }
}
</script>
