import { Card } from "@/components/ui/card";
import { UserAuthForm } from "./components/user-auth-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="p-6">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Вход</h1>
            <p className="text-muted-foreground text-sm">
              Введите ваш email и пароль ниже <br />
              для входа в ваш аккаунт
            </p>
          </div>
          <UserAuthForm />
          <p className="text-muted-foreground mt-4 px-8 text-center text-sm">
            Нажимая войти, вы соглашаетесь с нашими{" "}
            <a
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Условиями использования
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
      </div>
    </div>
  );
}
