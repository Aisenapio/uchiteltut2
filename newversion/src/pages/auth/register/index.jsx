import { Link } from "react-router"
import { Card } from "@/components/ui/card"
import { RegisterForm } from "./components/register-form"

export default function RegisterPage() {
  return (
    <Card className="p-6">
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <h1 className="text-lg font-semibold tracking-tight">
          Создать аккаунт
        </h1>
        <p className="text-muted-foreground text-sm">
          Введите ваш email и пароль для создания аккаунта. <br />
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className="hover:text-primary underline underline-offset-4"
          >
            Войти
          </Link>
        </p>
      </div>
      <RegisterForm />
      <p className="text-muted-foreground mt-4 px-8 text-center text-sm">
        Создавая аккаунт, вы соглашаетесь с нашими{" "}
        <a
          href="/terms"
          className="hover:text-primary underline underline-offset-4"
        >
          Пользовательским соглашением
        </a>{" "}
        и{" "}
        <a
          href="/privacy"
          className="hover:text-primary underline underline-offset-4"
        >
          Политикой конфиденциальности
        </a>
        .
      </p>
    </Card>
  )
}
