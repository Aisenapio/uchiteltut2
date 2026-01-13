import { Link, useNavigate } from "react-router"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Header } from "@/components/layout/header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { categories, statuses } from "../data/data"

const formSchema = z.object({
  name: z.string().min(1, "Название обязательно."),
  description: z.string().optional(),
  category: z.enum(["rental", "subscription", "membership", "service"], {
    required_error: "Пожалуйста, выберите категорию.",
  }),
  status: z.enum(["legal", "individual"], {
    required_error: "Пожалуйста, выберите тип лица.",
  }),
  price: z.coerce.number().min(0, "Цена должна быть положительным числом."),
})

export default function NewProductPage() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: undefined,
      status: undefined,
      price: 0,
    },
  })

  const onSubmit = (data) => {
    // do something with the form data
    toast({
      title: "Продукт создан",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    // Navigate back to products page
    navigate("/products")
  }

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <div className="flex w-full flex-col gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Продукты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Создать продукт</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Создать продукт</h2>
              <p className="text-muted-foreground text-sm">
                Добавьте новый продукт для подписки клиентов
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="max-w-3xl">
          <Form {...form}>
            <form
              id="new-product-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Введите название продукта"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Введите описание продукта"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Категория</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {categories.map((cat) => (
                          <FormItem
                            key={cat.value}
                            className="flex items-center"
                          >
                            <FormControl>
                              <RadioGroupItem
                                className="peer sr-only"
                                value={cat.value}
                                id={`category-${cat.value}`}
                              />
                            </FormControl>
                            <Label
                              htmlFor={`category-${cat.value}`}
                              className={cn(
                                "border-input w-full cursor-pointer rounded-md border bg-transparent px-4 py-4 shadow-xs transition-[color,box-shadow] peer-data-[state=checked]:border-blue-600"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={cn(
                                      "h-3 w-3 rounded-full outline outline-offset-[2px]",
                                      form.watch("category") === cat.value &&
                                        "bg-blue-600 outline-blue-500"
                                    )}
                                  />
                                  <div className="flex flex-col items-start">
                                    <p className="text-sm font-semibold">
                                      {cat.label}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Label>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Тип лица</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {statuses.map((status) => (
                          <FormItem
                            key={status.value}
                            className="flex items-center"
                          >
                            <FormControl>
                              <RadioGroupItem
                                className="peer sr-only"
                                value={status.value}
                                id={`status-${status.value}`}
                              />
                            </FormControl>
                            <Label
                              htmlFor={`status-${status.value}`}
                              className={cn(
                                "border-input w-full cursor-pointer rounded-md border bg-transparent px-4 py-4 shadow-xs transition-[color,box-shadow] peer-data-[state=checked]:border-blue-600"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={cn(
                                      "h-3 w-3 rounded-full outline outline-offset-[2px]",
                                      form.watch("status") === status.value &&
                                        "bg-blue-600 outline-blue-500"
                                    )}
                                  />
                                  <div className="flex flex-col items-start">
                                    <p className="text-sm font-semibold">
                                      {status.label}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Label>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Цена</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Введите цену"
                          min="0"
                          step="0.01"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit">Создать продукт</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/products")}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

