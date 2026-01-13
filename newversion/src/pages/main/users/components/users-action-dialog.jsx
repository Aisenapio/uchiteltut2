import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/password-input"
import SelectDropdown from "@/components/select-dropdown"
import { userTypes } from "../data/data"

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "Имя обязательно." }),
    lastName: z.string().min(1, { message: "Фамилия обязательна." }),
    username: z.string().min(1, { message: "Имя пользователя обязательно." }),
    phoneNumber: z.string().min(1, { message: "Номер телефона обязателен." }),
    email: z
      .string()
      .min(1, { message: "Email обязателен." })
      .email({ message: "Email неверный." }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().min(1, { message: "Роль обязательна." }),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== "")) {
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Пароль обязателен.",
          path: ["password"],
        })
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Пароль должен содержать не менее 8 символов.",
          path: ["password"],
        })
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Пароль должен содержать хотя бы одну строчную букву.",
          path: ["password"],
        })
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Пароль должен содержать хотя бы одну цифру.",
          path: ["password"],
        })
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Пароли не совпадают.",
          path: ["confirmPassword"],
        })
      }
    }
  })

export function UsersActionDialog({ currentRow, open, onOpenChange }) {
  const isEdit = !!currentRow
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow,
        password: "",
        confirmPassword: "",
        isEdit,
      }
      : {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        role: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        isEdit,
      },
  })

  const onSubmit = (values) => {
    form.reset()
    toast({
      title: "Вы отправили следующие значения:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Редактировать пользователя" : "Добавить нового пользователя"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Обновите пользователя здесь. " : "Создайте нового пользователя здесь. "}
            Нажмите сохранить, когда закончите.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="user-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Имя
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Иван"
                      className="col-span-4"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Фамилия
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Иванов"
                      className="col-span-4"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Имя пользователя
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ivan_ivanov"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ivan.ivanov@gmail.com"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Номер телефона
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+79991234567"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">Роль</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder="Выберите роль"
                    className="col-span-4"
                    items={userTypes.map(({ label, value }) => ({
                      label,
                      value,
                    }))}
                  />
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Пароль
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Подтвердите пароль
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={!isPasswordTouched}
                      placeholder="********"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="user-form">
            Сохранить изменения
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
