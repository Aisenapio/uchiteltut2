import { Link } from "react-router"
import { BackButton } from "../back-button"
import { Button } from "../ui/button"

export default function NotFoundError() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">404</h1>
        <span className="font-medium">Упс! Страница не найдена!</span>
        <p className="text-muted-foreground text-center">
          Похоже, страница, которую вы ищете, <br />
          не существует или была удалена.
        </p>
        <div className="mt-6 flex gap-4">
          <BackButton />
          <Button asChild>
            <Link to="/">Вернуться на главную</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
