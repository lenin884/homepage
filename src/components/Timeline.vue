<template>
  <div class="timeline" ref="timelineRef">
    <svg class="timeline-path">
      <defs>
        <linearGradient id="timelineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#42a5f5" />
          <stop offset="100%" stop-color="#7e57c2" />
        </linearGradient>
      </defs>
      <path :d="pathData" />
    </svg>
    <TimelineItem
      v-for="(item, index) in timelineItems"
      :key="item.name"
      :item="item"
      :top="index % 2 === 0"
    />
  </div>
</template>

<script setup lang="ts">
import '../assets/timeline.css'

import { storeToRefs } from 'pinia'
import { useTimelinesStore } from '../stores/timelines'
import TimelineItem from './TimelineItem.vue'
import { ref, onMounted, onBeforeUnmount, nextTick, onUpdated } from 'vue'

const store = useTimelinesStore()
const { timelines: timelineItems } = storeToRefs(store)

const timelineRef = ref<HTMLElement | null>(null)
const pathData = ref('')

const computePath = () => {
  const container = timelineRef.value
  if (!container) return
  const rect = container.getBoundingClientRect()
  const dots = container.querySelectorAll<HTMLElement>('.timeline-dot')
  let d = ''
  let prevX = 0
  let prevY = 0
  dots.forEach((dot, i) => {
    const r = dot.getBoundingClientRect()
    const x = r.left + r.width / 2 - rect.left
    const y = r.top + r.height / 2 - rect.top
    if (i === 0) {
      d += `M ${x} ${y}`
    } else {
      d += ` Q ${(prevX + x) / 2} ${(prevY + y) / 2} ${x} ${y}`
    }
    prevX = x
    prevY = y
  })
  pathData.value = d
}

onMounted(() => {
  computePath()
  window.addEventListener('resize', computePath)
})

onUpdated(() => nextTick(computePath))

onBeforeUnmount(() => {
  window.removeEventListener('resize', computePath)
})
</script>
