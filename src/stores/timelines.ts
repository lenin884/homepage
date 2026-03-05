import { ref } from 'vue'
import { defineStore } from 'pinia'

interface ProjectMetric {
  label: string
  value: string
}

interface TimelineDetail {
  name: string
  description: string
}

interface TimelineItem {
  period: { start: string; end: string }
  name: string
  description: string
  showDetails: boolean
  details: TimelineDetail[]
  stack: string[]
  metrics: ProjectMetric[]
  infra: string[]
}

export const useTimelinesStore = defineStore('timelines', () => {
  const timelines = ref<TimelineItem[]>([
    {
      period: { start: '2022-02-01', end: '2022-11-30' },
      name: 'E-commerce Pulse',
      description: 'Маркетплейс витрина с персонализацией и аналитикой поведения покупателей.',
      showDetails: true,
      details: [
        { name: 'Каталог', description: 'Динамические фильтры и SEO-friendly карточки товаров.' },
        { name: 'Checkout', description: 'Сократили путь до оплаты до 3 шагов.' }
      ],
      stack: ['Vue 3', 'TypeScript', 'Pinia', 'REST API'],
      metrics: [
        { label: 'Uptime', value: '99.96%' },
        { label: 'Conversion', value: '+18%' },
        { label: 'Avg. TTFB', value: '180ms' }
      ],
      infra: ['Nginx', 'GitHub Actions', 'Sentry', 'Cloudflare CDN']
    },
    {
      period: { start: '2023-01-15', end: '2023-12-15' },
      name: 'Logistics Control Tower',
      description: 'Панель мониторинга логистики с алертами и картой SLA по регионам.',
      showDetails: true,
      details: [
        { name: 'Dashboards', description: 'Реалтайм графики и SLA heatmap для операционного центра.' },
        { name: 'Alerts', description: 'Настраиваемые webhook/Telegram-уведомления.' }
      ],
      stack: ['Vue 3', 'Vite', 'WebSocket', 'Chart.js'],
      metrics: [
        { label: 'Events/day', value: '2.3M' },
        { label: 'P95 latency', value: '240ms' },
        { label: 'Alert precision', value: '93%' }
      ],
      infra: ['Kubernetes', 'Prometheus', 'Grafana', 'Redis Streams']
    },
    {
      period: { start: '2024-01-10', end: '2024-10-20' },
      name: 'Fintech Client Cabinet',
      description: 'Личный кабинет с KYC-потоком, документами и финансовой отчетностью.',
      showDetails: true,
      details: [
        { name: 'Security', description: '2FA, контроль сессий и аудит действий пользователя.' },
        { name: 'Reports', description: 'Генерация отчетов за секунды вместо минут.' }
      ],
      stack: ['Vue 3', 'TypeScript', 'Pinia', 'OpenAPI'],
      metrics: [
        { label: 'MAU', value: '54k' },
        { label: 'KYC pass rate', value: '82%' },
        { label: 'Error rate', value: '0.12%' }
      ],
      infra: ['Terraform', 'PostgreSQL', 'Vault', 'ArgoCD']
    }
  ])

  return { timelines }
})
