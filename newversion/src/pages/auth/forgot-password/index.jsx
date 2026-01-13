import { Link } from "react-router"
import { Card } from "@/components/ui/card"
import { ForgotPasswordForm } from "./components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <Card className="p-6">
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <h1 className="text-md font-semibold tracking-tight">
          Забыли пароль
        </h1>
        <p className="text-muted-foreground text-sm">
          Введите ваш зарегистрированный email и <br /> мы отправим вам ссылку для
          сброса пароля.
        </p>
      </div>
      <ForgotPasswordForm />
      <p className="text-muted-foreground mt-4 px-8 text-center text-sm">
        Нет аккаунта?{" "}
        <Link
          to="/register"
          className="hover:text-primary underline underline-offset-4"
        >
          Зарегистрироваться
        </Link>
        .
      </p>
    </Card>
  )
}
