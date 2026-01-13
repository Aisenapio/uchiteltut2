import { z } from "zod"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { IconCalendarMonth, IconCheck, IconSelector } from "@tabler/icons-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router"
import { nofitySubmittedValues } from "@/lib/notify-submitted-values"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { label: "Английский", value: "en" },
  { label: "Французский", value: "fr" },
  { label: "Немецкий", value: "de" },
  { label: "Испанский", value: "es" },
  { label: "Португальский", value: "pt" },
  { label: "Русский", value: "ru" },
  { label: "Японский", value: "ja" },
  { label: "Корейский", value: "ko" },
  { label: "Китайский", value: "zh" },
]

const accountFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Имя пользователя должно содержать не менее 2 символов.",
    })
    .max(30, {
      message: "Имя пользователя не должно быть длиннее 30 символов.",
    }),
  email: z
    .string({
      required_error: "Пожалуйста, выберите email для отображения.",
    })
    .email(),
  name: z
    .string()
    .min(2, {
      message: "Имя должно содержать не менее 2 символов.",
    })
    .max(30, {
      message: "Имя не должно быть длиннее 30 символов.",
    }),
  dob: z.date({
    required_error: "Требуется дата рождения.",
  }),
  language: z.string({
    required_error: "Пожалуйста, выберите язык.",
  }),
})


// This can come from your database or API.
const defaultValues = {
  name: "Ваше имя",
  dob: new Date("2023-01-23"),
}

export function AccountForm() {
  const form = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data) {
    nofitySubmittedValues(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Ваше имя" {...field} />
              </FormControl>
              <FormDescription>
                Это имя будет отображаться в вашем профиле и в электронных письмах.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                Это ваше публичное отображаемое имя. Это может быть ваше настоящее имя или псевдоним. Вы можете изменить это только раз в 30 дней.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите подтвержденный email для отображения" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Вы можете управлять подтвержденными адресами электронной почты в{" "}
                <Link to="/">настройках электронной почты</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата рождения</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-60 pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "d MMM yyyy", { locale: ru })
                      ) : (
                        <span>Выберите дату</span>
                      )}
                      <IconCalendarMonth className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Ваша дата рождения используется для расчета вашего возраста.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Язык</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Выберите язык"}
                      <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Поиск языка..." />
                    <CommandEmpty>Язык не найден.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("language", language.value)
                            }}
                          >
                            <IconCheck
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Это язык, который будет использоваться в панели управления.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Обновить аккаунт</Button>
      </form>
    </Form>
  )
}
