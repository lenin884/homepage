<template>
  <section class="row g-4 align-items-stretch">
    <div class="col-12 col-xl-4">
      <div class="card h-100 border-0 shadow-sm metrics-panel">
        <div class="card-body">
          <h2 class="h5 mb-3">Infra / Delivery Metrics</h2>
          <div class="row row-cols-2 g-3 mb-3">
            <div v-for="item in overviewMetrics" :key="item.label" class="col">
              <div class="rounded-3 p-3 bg-body-tertiary h-100">
                <div class="small text-secondary">{{ item.label }}</div>
                <div class="fw-bold fs-5">{{ item.value }}</div>
              </div>
            </div>
          </div>
          <p class="small text-secondary mb-0">
            В терминале доступны команды <code>metrics</code>, <code>infra</code>, <code>project &lt;name&gt;</code> и
            <code>projects</code>.
          </p>
        </div>
      </div>
    </div>

    <div class="col-12 col-xl-8">
      <div class="console" @click="focusInput">
        <div class="console-header">
          <div class="console-bubble red"></div>
          <div class="console-bubble yellow"></div>
          <div class="console-bubble green"></div>
          <span class="console-title">Portfolio Terminal</span>
        </div>
        <div class="console-output" ref="outputRef">
          <div v-for="entry in entries" :key="entry.id" class="console-entry">
            <div v-if="entry.command" class="console-line command-line">
              <span class="console-prompt">{{ prompt }}</span>
              <span class="console-command">{{ entry.command }}</span>
            </div>
            <div v-for="(line, index) in entry.output" :key="index" class="console-line">
              <span class="console-text">{{ line }}</span>
            </div>
          </div>
        </div>
        <form class="console-input" @submit.prevent="handleSubmit">
          <label class="console-prompt" for="command">{{ prompt }}</label>
          <input
            id="command"
            ref="inputRef"
            v-model="command"
            type="text"
            autocomplete="off"
            spellcheck="false"
            @keydown.up.prevent="recallPrevious"
            @keydown.down.prevent="recallNext"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimelinesStore } from '../stores/timelines'

interface ConsoleEntry { id: number; command?: string; output: string[] }
type CommandHandler = (args: string[]) => string[]
interface CommandDefinition { description: string; handler: CommandHandler }

const prompt = 'visitor@home:~$'
const command = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const outputRef = ref<HTMLDivElement | null>(null)
const history = ref<string[]>([])
const historyIndex = ref(-1)

const timelinesStore = useTimelinesStore()
const { timelines } = storeToRefs(timelinesStore)

const overviewMetrics = computed(() => {
  const projectCount = timelines.value.length
  const deploymentCadence = `${Math.max(projectCount * 3, 6)}/month`
  const uptime = timelines.value[0]?.metrics.find((m) => m.label === 'Uptime')?.value ?? '99.9%'
  return [
    { label: 'Projects', value: String(projectCount) },
    { label: 'Deploy cadence', value: deploymentCadence },
    { label: 'Platform uptime', value: uptime },
    { label: 'Console commands', value: '10' }
  ]
})

const entries = ref<ConsoleEntry[]>([
  {
    id: 0,
    output: ['Добро пожаловать в портфолио-терминал.', 'Введите `help` чтобы увидеть команды, `metrics` для сводки.']
  }
])

const parseLimit = (raw: string | undefined, max: number, fallback?: number) => {
  if (max <= 0) return 0
  const defaultCount = fallback && fallback > 0 ? Math.min(fallback, max) : max
  if (!raw) return defaultCount
  const parsed = Number.parseInt(raw, 10)
  if (Number.isNaN(parsed) || parsed <= 0) return defaultCount
  return Math.min(parsed, max)
}

const findProject = (query: string) => {
  const normalized = query.toLowerCase()
  return timelines.value.find((item) => item.name.toLowerCase().includes(normalized))
}

const commandDefinitions = computed<Record<string, CommandDefinition>>(() => {
  const definitions: Record<string, CommandDefinition> = {}

  definitions.about = {
    description: 'Кратко обо мне и подходе к продукту',
    handler: () => ['Frontend engineer: интерфейсы, UX и инженерная надежность.', 'Фокус: скорость релизов, метрики качества и понятный DX.']
  }

  definitions.projects = {
    description: 'Список проектов (projects [n])',
    handler: (args) => {
      const limit = parseLimit(args[0], timelines.value.length, timelines.value.length)
      return timelines.value.slice(0, limit).map((item, i) => `${i + 1}. ${item.name} — ${item.description}`)
    }
  }

  definitions.project = {
    description: 'Детали по проекту: project <name>',
    handler: (args) => {
      const query = args.join(' ').trim()
      if (!query) return ['Укажите имя проекта. Например: project fintech']
      const project = findProject(query)
      if (!project) return [`Проект по запросу «${query}» не найден.`]
      return [
        `${project.name} (${project.period.start} → ${project.period.end})`,
        project.description,
        `Stack: ${project.stack.join(', ')}`,
        'Metrics:',
        ...project.metrics.map((metric) => `  - ${metric.label}: ${metric.value}`)
      ]
    }
  }

  definitions.metrics = {
    description: 'Сводные метрики по проектам',
    handler: () => {
      const total = timelines.value.length
      const metricLines = timelines.value.flatMap((project) =>
        project.metrics.map((metric) => `${project.name} :: ${metric.label} = ${metric.value}`)
      )
      return [`Всего проектов: ${total}`, ...metricLines]
    }
  }

  definitions.infra = {
    description: 'Инфраструктурный стек по проектам',
    handler: () => timelines.value.flatMap((project) => [`${project.name}:`, ...project.infra.map((item) => `  - ${item}`)])
  }

  definitions.history = {
    description: 'Показать историю команд',
    handler: (args) => {
      if (!history.value.length) return ['История команд пуста.']
      const limit = parseLimit(args[0], history.value.length)
      return history.value.slice(0, limit).map((item, index) => `${index + 1}. ${item}`)
    }
  }

  definitions.clear = { description: 'Очистить экран терминала', handler: () => ((entries.value = []), []) }

  definitions.help = {
    description: 'Показать доступные команды',
    handler: () => Object.entries(definitions).map(([name, def]) => `${name.padEnd(10, ' ')}${def.description}`)
  }

  return definitions
})

const focusInput = () => inputRef.value?.focus()

const pushEntry = (entry: ConsoleEntry) => {
  entries.value = [...entries.value, entry]
  nextTick(() => {
    const el = outputRef.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

const handleSubmit = () => {
  const value = command.value.trim()
  if (!value) return
  const [commandName, ...args] = value.split(/\s+/)
  const normalized = commandName.toLowerCase()

  history.value.unshift(value)
  historyIndex.value = -1

  const commandDef = commandDefinitions.value[normalized]
  if (!commandDef) {
    pushEntry({ id: Date.now(), command: value, output: [`Команда «${normalized}» не найдена. Используйте help.`] })
    command.value = ''
    return
  }

  const result = commandDef.handler(args)
  if (normalized === 'clear') {
    command.value = ''
    return
  }

  pushEntry({ id: Date.now(), command: value, output: result })
  command.value = ''
}

const recallPrevious = () => {
  if (!history.value.length || historyIndex.value + 1 >= history.value.length) return
  historyIndex.value += 1
  command.value = history.value[historyIndex.value]
  nextTick(() => inputRef.value?.setSelectionRange(command.value.length, command.value.length))
}

const recallNext = () => {
  if (historyIndex.value <= 0) {
    historyIndex.value = -1
    command.value = ''
    return
  }
  historyIndex.value -= 1
  command.value = history.value[historyIndex.value]
  nextTick(() => inputRef.value?.setSelectionRange(command.value.length, command.value.length))
}

onMounted(() => focusInput())
</script>

<style scoped>
.metrics-panel { background: linear-gradient(160deg, #ffffff, #f2f7ff); }
.console { background: #0d1117; border-radius: 12px; box-shadow: 0 15px 35px rgba(0,0,0,.35); color: #c9d1d9; font-family: 'Fira Code', monospace; min-height: 560px; display:flex; flex-direction:column; border:1px solid #1f2937; }
.console-header { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid #1f2937; background: linear-gradient(120deg, rgba(36,45,58,.9), rgba(13,17,23,.95)); }
.console-bubble { width:12px; height:12px; border-radius:50%; }
.red{background:#ff5f56}.yellow{background:#fdbc2e}.green{background:#27c93f}
.console-title { margin-left:auto; font-size:.85rem; letter-spacing:.08em; text-transform:uppercase; color:#8b949e; }
.console-output { flex:1; overflow-y:auto; padding:24px 24px 12px; }
.console-entry + .console-entry { margin-top:16px; }
.console-line { display:flex; gap:12px; align-items:baseline; white-space:pre-wrap; }
.command-line { margin-bottom:6px; }
.console-prompt { color:#58a6ff; }
.console-command { color:#f8fafc; }
.console-text { color:#c9d1d9; }
.console-input { display:flex; align-items:center; gap:12px; padding:16px 24px 24px; border-top:1px solid #1f2937; }
.console-input input { background:transparent; border:none; border-bottom:1px solid transparent; color:#f8fafc; flex:1; font:inherit; outline:none; padding:6px 0; }
.console-input input:focus { border-bottom:1px solid #2563eb; }
</style>
