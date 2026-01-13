import { z } from "zod"

const userStatusSchema = z.union([
  z.literal("активные"),
  z.literal("не_активные"),
  z.literal("приглашенные"),
  z.literal("оплата_не_прошла"),
])

const userRoleSchema = z.union([
  z.literal("superadmin"),
  z.literal("admin"),
  z.literal("cashier"),
  z.literal("manager"),
])

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  lastLoginAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const userListSchema = z.array(userSchema)
