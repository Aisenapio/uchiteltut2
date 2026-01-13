import * as z from "zod"
import { useForm } from "react-hook-form"
import { IconHome, IconId, IconMessage2Question } from "@tabler/icons-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router"
import { nofitySubmittedValues } from "@/lib/notify-submitted-values"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { DeleteActions } from "./delete-actions"

const formSchema = z.object({
  font: z.string({
    required_error: "Шрифт обязателен.",
  }),
  company_tax_id: z.string().min(1, {
    message: "Налоговый идентификатор обязателен.",
  }),
  company_address: z.string().min(1, {
    message: "Адрес компании обязателен.",
  }),
  company_logo: z
    .instanceof(File)
    .refine(
      (file) =>
        ["image/webp", "image/jpeg", "image/png", "image/svg+xml"].includes(
          file.type
        ),
      {
        message: "Разрешены только файлы WebP, JPEG, PNG или SVG",
      }
    )
    .optional(),
})

export default function GeneralForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_tax_id: "",
      company_address: "",
    },
  })

  function onSubmit(values) {
    nofitySubmittedValues(values)
  }

  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center">
        <div className="flex flex-col items-start text-sm">
          <p className="font-bold tracking-wide">
            Ваше приложение сейчас на бесплатном плане
          </p>
          <p className="text-muted-foreground font-medium">
            Платные планы предлагают более высокие лимиты использования, дополнительные ветки и многое
            другое. Узнайте больше{" "}
            <Link to="" className="underline">
              здесь
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <IconMessage2Question />
            Написать нам
          </Button>
          <Button variant="outline">Обновить</Button>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <FormField
          control={form.control}
          name="company_logo"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>Логотип компании</FormLabel>
                <FormDescription>Обновите логотип вашей компании.</FormDescription>
                <FormMessage />
              </div>
              <div className="flex items-center gap-2">
                {value && (
                  <img
                    alt="company-logo"
                    width={35}
                    height={35}
                    className="h-[35px] w-[35px] rounded-md object-cover"
                    src={URL.createObjectURL(value)}
                  />
                )}
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    placeholder="Company Logo"
                    accept="image/webp,image/jpeg,image/png/image/svg+xml"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>Системный шрифт</FormLabel>
                <FormDescription>
                  Установите шрифт, который вы хотите использовать в панели управления.
                </FormDescription>
                <FormMessage />
              </div>

              <div>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Выберите шрифт" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="manrope">Manrope</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="company_tax_id"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>Налоговый идентификатор бизнеса</FormLabel>
                <FormDescription>Налоговый идентификатор компании.</FormDescription>
                <FormMessage />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <FormControl>
                    <Input placeholder="Налоговый идентификатор бизнеса" {...field} />
                  </FormControl>
                </div>
                <Badge variant="outline" className="py-2">
                  <IconId size={20} strokeWidth={1.5} />
                </Badge>
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="company_address"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>Адрес бизнеса</FormLabel>
                <FormDescription>Адрес компании.</FormDescription>
                <FormMessage />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <FormControl>
                    <Input placeholder="Адрес бизнеса" {...field} />
                  </FormControl>
                </div>

                <Badge variant="outline" className="py-2">
                  <IconHome size={20} strokeWidth={1.5} />
                </Badge>
              </div>
            </FormItem>
          )}
        />
        <Button>Сохранить изменения</Button>
      </form>
      <div className="mt-10 mb-4 flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center">
        <div className="flex flex-col items-start text-sm">
          <p className="font-bold tracking-wide">Удалить аккаунт</p>
          <p className="text-muted-foreground font-medium">
            Вы можете сделать &apos;Отключить аккаунт&apos; чтобы сделать перерыв от панели.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DeleteActions />
        </div>
      </div>
    </Form>
  )
}
