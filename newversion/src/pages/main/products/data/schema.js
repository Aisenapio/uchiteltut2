import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category: z.union([
    z.literal("rental"),
    z.literal("subscription"),
    z.literal("membership"),
    z.literal("service"),
  ]),
  status: z.union([
    z.literal("legal"),
    z.literal("individual"),
  ]),
  price: z.number(),
  currency: z.string().default("RUB"),
  subscribers: z.number().default(0),
  revenue: z.number().default(0),
  createdDate: z.coerce.date(),
})

export const productListSchema = z.array(productSchema)

