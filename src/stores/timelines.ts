import { ref } from 'vue'
import { defineStore } from 'pinia'

// Хранилище с заполненными данными timeline items с name и description
export const useTimelinesStore = defineStore('timelines', () => {
  const timelines = ref([
    {
      period: { start: '2021-01-01', end: '2021-12-31' },
      name: 'Timeline 1',
      description: 'Description for timeline 1',
      showDetails: true,
      details: [
        { name: 'Detail 1.1', description: 'Description for detail 1.1' },
        { name: 'Detail 1.2', description: 'Description for detail 1.2' },
      ],
    },
    {
      period: { start: '2022-01-01', end: '2022-12-31' },
      name: 'Timeline 2',
      description: 'Description for timeline 2',
      showDetails: true,
      details: [
        { name: 'Detail 2.1', description: 'Description for detail 2.1' },
        { name: 'Detail 2.2', description: 'Description for detail 2.2' },
      ],
    },
    {
      period: { start: '2023-01-01', end: '2023-12-31' },
      name: 'Timeline 3',
      description: 'Description for timeline 3',
      showDetails: true,
      details: [
        { name: 'Detail 3.1', description: 'Description for detail 3.1' },
        { name: 'Detail 3.2', description: 'Description for detail 3.2' },
      ],
    },
    {
      period: { start: '2024-01-01', end: '2024-12-31' },
      name: 'Timeline 4',
      description: 'Description for timeline 4',
      showDetails: true,
      details: [
        { name: 'Detail 4.1', description: 'Description for detail 4.1' },
        { name: 'Detail 4.2', description: 'Description for detail 4.2' },
      ],
    },
    {
      period: { start: '2025-01-01', end: '2025-12-31' },
      name: 'Timeline 5',
      description: 'Description for timeline 5',
      showDetails: true,
      details: [
        { name: 'Detail 5.1', description: 'Description for detail 5.1' },
        { name: 'Detail 5.2', description: 'Description for detail 5.2' },
      ],
    },
    {
      period: { start: '2026-01-01', end: '2026-12-31' },
      name: 'Timeline 6',
      description: 'Description for timeline 6',
      showDetails: true,
      details: [
        { name: 'Detail 6.1', description: 'Description for detail 6.1' },
        { name: 'Detail 6.2', description: 'Description for detail 6.2' },
      ],
    },
    {
      period: { start: '2027-01-01', end: '2027-12-31' },
      name: 'Timeline 7',
      description: 'Description for timeline 7',
      showDetails: true,
      details: [
        { name: 'Detail 7.1', description: 'Description for detail 7.1' },
        { name: 'Detail 7.2', description: 'Description for detail 7.2' },
      ],
    },
    {
      period: { start: '2028-01-01', end: '2028-12-31' },
      name: 'Timeline 8',
      description: 'Description for timeline 8',
      showDetails: true,
      details: [
        { name: 'Detail 8.1', description: 'Description for detail 8.1' },
        { name: 'Detail 8.2', description: 'Description for detail 8.2' },
      ],
    },
    {
      period: { start: '2029-01-01', end: '2029-12-31' },
      name: 'Timeline 9',
      description: 'Description for timeline 9',
      showDetails: true,
      details: [
        { name: 'Detail 9.1', description: 'Description for detail 9.1' },
        { name: 'Detail 9.2', description: 'Description for detail 9.2' },
      ],
    },
    {
      period: { start: '2030-01-01', end: '2030-12-31' },
      name: 'Timeline 10',
      description: 'Description for timeline 10',
      showDetails: true,
      details: [
        { name: 'Detail 10.1', description: 'Description for detail 10.1' },
        { name: 'Detail 10.2', description: 'Description for detail 10.2' },
      ],
    },
  ])

  return { timelines }
})
