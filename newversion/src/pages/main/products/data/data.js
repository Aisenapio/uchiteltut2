import {
  IconCircleCheck,
  IconCircleX,
  IconShoppingBag,
  IconTag,
} from "@tabler/icons-react"

export const categories = [
  {
    value: "rental",
    label: "Аренда",
  },
  {
    value: "subscription",
    label: "Подписка",
  },
  {
    value: "membership",
    label: "Членство",
  },
  {
    value: "service",
    label: "Услуга",
  },
]

export const statuses = [
  {
    value: "legal",
    label: "Юридическое лицо",
    icon: IconCircleCheck,
  },
  {
    value: "individual",
    label: "Физическое лицо",
    icon: IconCircleX,
  },
]

// Helper function to generate dates for products
export const generateProductDates = () => {
  const now = new Date()
  const createdDate = new Date(now)
  createdDate.setDate(now.getDate() - Math.floor(Math.random() * 180)) // Random date within last 180 days

  return { createdDate }
}

