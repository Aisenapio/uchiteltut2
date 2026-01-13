import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { IconBrandFacebook, IconBrandGithub } from "@tabler/icons-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router"
import { nofitySubmittedValues } from "@/lib/notify-submitted-values"
import { cn } from "@/lib/utils"
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
import { PasswordInput } from "@/components/password-input"

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Пожалуйста, введите ваш email" })
    .email({ message: "Неверный адрес email" }),
  password: z
    .string()
    .min(1, {
      message: "Пожалуйста, введите ваш пароль",
    })
    .min(7, {
      message: "Пароль должен содержать не менее 7 символов",
    }),
})

export function UserAuthForm({
  className,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data) {
    setIsLoading(true)
    nofitySubmittedValues(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Пароль</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-muted-foreground text-sm font-medium hover:opacity-75"
                    >
                      Забыли пароль?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" disabled={isLoading}>
              Войти
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  Или продолжить через
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex-1"
                type="button"
                disabled={isLoading}
              >
                <IconBrandGithub className="h-4 w-4" /> GitHub
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                type="button"
                disabled={isLoading}
              >
                <IconBrandFacebook className="h-4 w-4" />
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
