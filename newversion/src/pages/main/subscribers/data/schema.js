import { z } from "zod"

const subscriberStatusSchema = z.union([
  z.literal("оплачено"),
  z.literal("не активные"),
  z.literal("приглашенные"),
  z.literal("оплата не прошла"),
  z.literal("ожидает оплаты"),
])

const productPaymentStatusSchema = z.union([
  z.literal("оплачено"),
  z.literal("ожидает оплаты"),
  z.literal("оплата не прошла"),
  z.literal("не активный"),
  z.literal("приглашенные"),
])

const productSubscriptionSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  subscribedAt: z.coerce.date(),
  paymentDate: z.coerce.date().optional(),
  paymentStatus: productPaymentStatusSchema,
})

// Схема для юридических лиц
const legalEntitySchema = z.object({
  type: z.literal("legal"),
  companyName: z.string(),
  inn: z.string(),
  kpp: z.string().optional(),
  ogrn: z.string().optional(),
  legalAddress: z.string(),
  bankAccount: z.string().optional(),
  bankName: z.string().optional(),
  bik: z.string().optional(),
  contactPerson: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
})

// Схема для физических лиц
const individualSchema = z.object({
  type: z.literal("individual"),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string(),
})

// Общая схема подписчика - базовая часть
const baseSubscriberSchema = z.object({
  id: z.string(),
  status: subscriberStatusSchema,
  products: z.array(productSubscriptionSchema).default([]),
  createdAt: z.coerce.date(),
  lastLoginAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

// Объединение базовой схемы с типом подписчика
const subscriberSchema = z.union([
  baseSubscriberSchema.merge(legalEntitySchema),
  baseSubscriberSchema.merge(individualSchema),
])

export const subscriberListSchema = z.array(subscriberSchema)

