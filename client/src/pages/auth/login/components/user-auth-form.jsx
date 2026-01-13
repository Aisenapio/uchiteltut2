import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"
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
import { useMutation } from '@apollo/client/react';
import { LOGIN } from '@/graphql/authOperations';

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
  const navigate = useNavigate();
  const [login, { error }] = useMutation(LOGIN);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data) {
    setIsLoading(true);

    try {
      const response = await login({
        variables: {
          input: {
            email: data.email,
            password: data.password
          }
        }
      });

      // Store the token in localStorage
      const { token } = response.data.login;
      localStorage.setItem('token', token);

      // Redirect based on user role
      const { role } = response.data.login.user;
      if (role === 'school') {
        navigate('/dashboard/school');
      } else if (role === 'teacher') {
        navigate('/dashboard/teacher');
      } else {
        navigate('/'); // Default redirect
      }
    } catch (err) {
      console.error('Login error:', err);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
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
            <Button variant="outline" className="mt-2" asChild>
              <Link to="/register">Зарегистрироваться</Link>
            </Button>

          </div>
        </form>
      </Form>
    </div>
  )
}
