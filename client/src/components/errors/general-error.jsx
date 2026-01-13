import { Link } from "react-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"

export default function GeneralError({ className, minimal = false }) {
  return (
    <div className={cn("h-svh w-full", className)}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        {!minimal && (
          <h1 className="text-[7rem] leading-tight font-bold">500</h1>
        )}
        <span className="font-medium">Упс! Что-то пошло не так {`:')`}</span>
        <p className="text-muted-foreground text-center">
          Приносим извинения за неудобства. <br /> Пожалуйста, попробуйте позже.
        </p>
        {!minimal && (
          <div className="mt-6 flex gap-4">
            <BackButton />
            <Button asChild>
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
