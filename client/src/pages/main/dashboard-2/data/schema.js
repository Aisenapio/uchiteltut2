import { z } from "zod"

const recentActivityStatusSchema = z.enum([
  "New",
  "Delete",
  "Invited",
  "Suspended",
])

const recentActivitySchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  amount: z.number(),
  status: recentActivityStatusSchema,
  createdAt: z.coerce.date(),
})

export const recentActivityListSchema = z.array(recentActivitySchema)
