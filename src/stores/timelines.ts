import { ref } from 'vue'
import { defineStore } from 'pinia'

// Хранилище с заполненными данными timeline items с name и description
export const useTimelinesStore = defineStore('timelines', () => {
  const timelines = ref([
    {
      period: {
        start: '2021-01-01',
        end: '2021-12-31',
      },
      name: 'First timeline',
      description: 'This is the first timeline',
      showDetails: true,
      details: [
        {
          name: 'First detail',
          description: 'This is the first detail',
        },
        {
          name: 'Second detail',
          description: 'This is the second detail',
        },
      ],
    },
    {
      period: {
        start: '2022-01-01',
        end: '2022-12-31',
      },
      name: 'Second timeline',
      description: 'This is the second timeline',
      showDetails: true,
      details: [
        {
          name: 'Third detail',
          description: 'This is the third detail',
        },
        {
          name: 'Fourth detail',
          description: 'This is the fourth detail',
        },
      ],
    },
  ])

  return { timelines }
})