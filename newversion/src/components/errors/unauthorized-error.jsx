import { Link } from "react-router"
import { BackButton } from "../back-button"
import { Button } from "../ui/button"

export default function UnauthorizedError() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">401</h1>
        <span className="font-medium">Несанкционированный доступ</span>
        <p className="text-muted-foreground text-center">
          Пожалуйста, войдите с соответствующими учетными данными <br /> для доступа к этому
          ресурсу.
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
