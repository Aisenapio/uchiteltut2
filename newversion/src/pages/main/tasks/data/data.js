import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconStopwatch,
} from "@tabler/icons-react"

export const labels = [
  {
    value: "bug",
    label: "Ошибка",
  },
  {
    value: "feature",
    label: "Функция",
  },
  {
    value: "documentation",
    label: "Документация",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Бэклог",
    icon: IconExclamationCircle,
  },
  {
    value: "todo",
    label: "К выполнению",
    icon: IconCircle,
  },
  {
    value: "in progress",
    label: "В работе",
    icon: IconStopwatch,
  },
  {
    value: "done",
    label: "Выполнено",
    icon: IconCircleCheck,
  },
  {
    value: "canceled",
    label: "Отменено",
    icon: IconCircleX,
  },
]

export const priorities = [
  {
    label: "Низкий",
    value: "low",
    icon: IconArrowDown,
  },
  {
    label: "Средний",
    value: "medium",
    icon: IconArrowRight,
  },
  {
    label: "Высокий",
    value: "high",
    icon: IconArrowUp,
  },
]

// Helper function to generate dates for tasks
export const generateTaskDates = () => {
  const now = new Date()
  const createdDate = new Date(now)
  createdDate.setDate(now.getDate() - Math.floor(Math.random() * 30)) // Random date within last 30 days

  const dueDate = new Date(now)
  dueDate.setDate(now.getDate() + 14 + Math.floor(Math.random() * 60)) // Random date 14-74 days in future

  return { createdDate, dueDate }
}

// Sprint cycles for tasks
export const sprintCycles = [
  "Sprint 23 (April 2024)",
  "Sprint 24 (May 2024)",
  "Sprint 25 (June 2024)",
]

// Estimated times for tasks
export const estimatedTimes = [
  "1-2 days",
  "2-3 days",
  "3-4 days",
  "4-5 days",
  "1 week",
]
