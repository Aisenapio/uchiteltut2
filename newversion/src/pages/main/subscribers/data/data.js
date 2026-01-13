import {
  IconUsersGroup,
  IconCircleCheck,
  IconClock,
  IconX,
} from "@tabler/icons-react"
import { UserRound, UserRoundPen } from "lucide-react"

export const subscriberTypes = [
  {
    value: "legal",
    label: "Юридическое лицо",
    icon: UserRoundPen,
  },
  {
    value: "individual",
    label: "Физическое лицо",
    icon: UserRound,
  },
]

export const callTypes = new Map([
  ["оплачено", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["не активные", "bg-neutral-300/40 border-neutral-300"],
  ["приглашенные", "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
  [
    "оплата не прошла",
    "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
  ],
  [
    "ожидает оплаты",
    "bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200",
  ],
])

export const productPaymentStatusTypes = new Map([
  ["оплачено", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  [
    "ожидает оплаты",
    "bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200",
  ],
  [
    "оплата не прошла",
    "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
  ],
  ["не активный", "bg-neutral-300/40 border-neutral-300"],
  ["приглашенные", "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
])

export const subscriberStats = [
  {
    title: "Всего подписчиков",
    desc: "Общее количество подписчиков в системе",
    stat: "0",
    statDesc: "+5% чем в предыдущем месяце",
    icon: IconUsersGroup,
  },
  {
    title: "Оплатили",
    desc: "Количество подписчиков с успешной оплатой",
    stat: "0",
    statDesc: "0% от всех подписчиков",
    icon: IconCircleCheck,
  },
  {
    title: "Ожидают оплаты",
    desc: "Количество подписчиков, ожидающих оплаты",
    stat: "0",
    statDesc: "0% от всех подписчиков",
    icon: IconClock,
  },
  {
    title: "Оплата не прошла",
    desc: "Количество подписчиков с неудачной оплатой",
    stat: "0",
    statDesc: "0% от всех подписчиков",
    icon: IconX,
  },
]

export const statusOptions = [
  { label: "Оплачено", value: "оплачено" },
  { label: "Не активные", value: "не активные" },
  { label: "Приглашенные", value: "приглашенные" },
  { label: "Оплата не прошла", value: "оплата не прошла" },
  { label: "Ожидает оплаты", value: "ожидает оплаты" },
]

export const typeOptions = [
  { label: "Юридическое лицо", value: "legal" },
  { label: "Физическое лицо", value: "individual" },
]

