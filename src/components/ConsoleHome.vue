<template>
  <div class="console" @click="focusInput">
    <div class="console-header">
      <div class="console-bubble red"></div>
      <div class="console-bubble yellow"></div>
      <div class="console-bubble green"></div>
      <span class="console-title">Portfolio Terminal</span>
    </div>
    <div class="console-output" ref="outputRef">
      <div
        v-for="entry in entries"
        :key="entry.id"
        class="console-entry"
      >
        <div v-if="entry.command" class="console-line command-line">
          <span class="console-prompt">{{ prompt }}</span>
          <span class="console-command">{{ entry.command }}</span>
        </div>
        <div
          v-for="(line, index) in entry.output"
          :key="index"
          class="console-line"
        >
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
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimelinesStore } from '../stores/timelines'

interface ConsoleEntry {
  id: number
  command?: string
  output: string[]
}

type CommandHandler = (args: string[]) => string[]

interface CommandDefinition {
  description: string
  handler: CommandHandler
}

const prompt = 'visitor@home:~$'
const command = ref('')
const entries = ref<ConsoleEntry[]>([
  {
    id: 0,
    output: [
      'Добро пожаловать в мое портфолио!',
      'Это интерактивный терминал. Введите `help`, чтобы увидеть доступные команды.'
    ]
  }
])

const inputRef = ref<HTMLInputElement | null>(null)
const outputRef = ref<HTMLDivElement | null>(null)
const history = ref<string[]>([])
const historyIndex = ref(-1)

const parseLimit = (raw: string | undefined, max: number, fallback?: number) => {
  if (max <= 0) return 0
  const defaultCount = fallback && fallback > 0 ? Math.min(fallback, max) : max
  if (!raw) {
    return defaultCount
  }
  const parsed = Number.parseInt(raw, 10)
  if (Number.isNaN(parsed) || parsed <= 0) {
    return defaultCount
  }
  return Math.min(parsed, max)
}

const timelinesStore = useTimelinesStore()
const { timelines } = storeToRefs(timelinesStore)

const commandDefinitions = computed<Record<string, CommandDefinition>>(() => {
  const definitions: Record<string, CommandDefinition> = {}

  definitions.about = {
    description: 'Информация обо мне',
    handler: (_args: string[]) => [
      'Привет! Я фронтенд-разработчик, увлеченный созданием выразительных интерфейсов.',
      'Люблю экспериментировать с пользовательскими сценариями и необычными подачами контента.'
    ]
  }

  definitions.timeline = {
    description: 'Краткое резюме ключевых этапов',
    handler: (args: string[]) => {
      if (!timelines.value.length) {
        return ['Пока нет данных для отображения таймлайна.']
      }
      const limit = parseLimit(args[0], timelines.value.length, Math.min(6, timelines.value.length))
      const items = timelines.value.slice(0, limit)
      return [
        'Основные этапы:',
        ...items.map((item) => `• ${item.period.start} — ${item.name}: ${item.description}`),
        'Используйте `projects` для подробностей.'
      ]
    }
  }

  definitions.projects = {
    description: 'Проекты и ключевые результаты',
    handler: (args: string[]) => {
      if (!timelines.value.length) {
        return ['Список проектов пока пуст.']
      }
      const limit = parseLimit(args[0], timelines.value.length, Math.min(5, timelines.value.length))
      return timelines.value
        .slice(0, limit)
        .flatMap((item) => [
          `${item.name} (${item.period.start.split('-')[0]}-${item.period.end.split('-')[0]})`,
          `  ${item.description}`,
          ...item.details.map((detail: { name: string; description: string }) => `  - ${detail.name}: ${detail.description}`),
          ''
        ])
        .filter((line, index, array) => !(line === '' && index === array.length - 1))
    }
  }

  definitions.stack = {
    description: 'Технологии и инструменты',
    handler: (_args: string[]) => [
      'Основной стек:',
      '• JavaScript / TypeScript',
      '• Vue 3 + Vite',
      '• Pinia, Vue Router',
      '• Tailwind, SCSS, дизайн-системы',
      '• CI/CD, автоматизация, тестирование'
    ]
  }

  definitions.contact = {
    description: 'Как связаться',
    handler: (_args: string[]) => [
      'Контакты:',
      '• Email: hello@example.com',
      '• Telegram: @frontend_dev',
      '• GitHub: github.com/frontend-dev'
    ]
  }

  definitions.history = {
    description: 'Показать историю введенных команд',
    handler: (args: string[]) => {
      if (!history.value.length) {
        return ['История команд пуста.']
      }
      const limit = parseLimit(args[0], history.value.length)
      return history.value.slice(0, limit).map((item, index) => `${index + 1}. ${item}`)
    }
  }

  definitions.clear = {
    description: 'Очистить экран',
    handler: (_args: string[]) => {
      entries.value = []
      return []
    }
  }

  definitions.help = {
    description: 'Показать доступные команды',
    handler: (args: string[]) => {
      if (args.length) {
        const target = args[0].toLowerCase()
        const command = definitions[target]
        if (command) {
          return [`${target} — ${command.description}`]
        }
        return [`Команда «${target}» не найдена.`]
      }
      const names = Object.keys(definitions)
      const longest = names.reduce((max, key) => Math.max(max, key.length), 0)
      const withoutClear = names.filter((name) => name !== 'clear')
      const output = withoutClear.map((name) => `${name.padEnd(longest + 2, ' ')}${definitions[name].description}`)
      output.push(`${'clear'.padEnd(longest + 2, ' ')}${definitions.clear.description}`)
      return output
    }
  }

  return definitions
})

const focusInput = () => {
  inputRef.value?.focus()
}

const pushEntry = (entry: ConsoleEntry) => {
  entries.value = [...entries.value, entry]
  nextTick(() => {
    const el = outputRef.value
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  })
}

const handleSubmit = () => {
  const value = command.value.trim()
  if (!value) return

  const [commandName, ...args] = value.split(/\s+/)
  const normalized = commandName.toLowerCase()

  history.value.unshift(value)
  historyIndex.value = -1

  const commandDef = commandDefinitions.value[normalized as keyof typeof commandDefinitions.value]

  if (!commandDef) {
    pushEntry({
      id: Date.now(),
      command: value,
      output: [`Команда «${normalized}» не найдена. Используйте help.`]
    })
    command.value = ''
    return
  }

  const result = commandDef.handler(args)
  if (normalized === 'clear') {
    command.value = ''
    return
  }

  pushEntry({
    id: Date.now(),
    command: value,
    output: Array.isArray(result) ? result : [result]
  })

  command.value = ''
}

const recallPrevious = () => {
  if (!history.value.length) return
  if (historyIndex.value + 1 >= history.value.length) return
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

onMounted(() => {
  focusInput()
})
</script>

<style scoped>
.console {
  background: #0d1117;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.45);
  color: #c9d1d9;
  font-family: 'Fira Code', 'Roboto Mono', Menlo, Monaco, 'Courier New', monospace;
  margin: 0 auto;
  max-width: 960px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  border: 1px solid #1f2937;
}

.console-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #1f2937;
  background: linear-gradient(120deg, rgba(36, 45, 58, 0.9), rgba(13, 17, 23, 0.95));
}

.console-bubble {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.console-bubble.red {
  background: #ff5f56;
}

.console-bubble.yellow {
  background: #fdbc2e;
}

.console-bubble.green {
  background: #27c93f;
}

.console-title {
  margin-left: auto;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b949e;
}

.console-output {
  flex: 1;
  overflow-y: auto;
  padding: 24px 24px 12px;
}

.console-entry + .console-entry {
  margin-top: 16px;
}

.console-line {
  display: flex;
  gap: 12px;
  align-items: baseline;
  white-space: pre-wrap;
}

.command-line {
  margin-bottom: 6px;
}

.console-prompt {
  color: #58a6ff;
}

.console-command {
  color: #f8fafc;
}

.console-text {
  color: #c9d1d9;
}

.console-input {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px 24px;
  border-top: 1px solid #1f2937;
}

.console-input input {
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  color: #f8fafc;
  flex: 1;
  font: inherit;
  outline: none;
  padding: 6px 0;
}

.console-input input:focus {
  border-bottom: 1px solid #2563eb;
}

@media (max-width: 768px) {
  .console {
    margin: 0 16px;
    min-height: 420px;
  }

  .console-output {
    padding: 16px;
  }

  .console-input {
    padding: 12px 16px 20px;
  }

  .console-line {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
