import { IconInfoCircle } from "@tabler/icons-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { subscriberStats } from "../data/data"
import { getSubscribers } from "../data/subscribers"
import { calculateSubscriberStatus } from "../data/utils"

export function SubscribersStats({ onFilterChange }) {
  const subscribers = getSubscribers()
  const totalSubscribers = subscribers.length
  // Вычисляем статусы на основе продуктов
  const paid = subscribers.filter(
    (s) => calculateSubscriberStatus(s.products || []) === "оплачено"
  ).length
  const waitingPayment = subscribers.filter(
    (s) => calculateSubscriberStatus(s.products || []) === "ожидает оплаты"
  ).length
  const paymentFailed = subscribers.filter(
    (s) => calculateSubscriberStatus(s.products || []) === "оплата не прошла"
  ).length

  const stats = subscriberStats.map((stat) => {
    if (stat.title === "Всего подписчиков") {
      return {
        ...stat,
        stat: totalSubscribers.toString(),
      }
    }
    if (stat.title === "Оплатили") {
      return {
        ...stat,
        stat: paid.toString(),
        statDesc:
          totalSubscribers > 0
            ? `${Math.round((paid / totalSubscribers) * 100)}% от всех подписчиков`
            : "0% от всех подписчиков",
      }
    }
    if (stat.title === "Ожидают оплаты") {
      return {
        ...stat,
        stat: waitingPayment.toString(),
        statDesc:
          totalSubscribers > 0
            ? `${Math.round((waitingPayment / totalSubscribers) * 100)}% от всех подписчиков`
            : "0% от всех подписчиков",
      }
    }
    if (stat.title === "Оплата не прошла") {
      return {
        ...stat,
        stat: paymentFailed.toString(),
        statDesc:
          totalSubscribers > 0
            ? `${Math.round((paymentFailed / totalSubscribers) * 100)}% от всех подписчиков`
            : "0% от всех подписчиков",
      }
    }
    return stat
  })

  const handleCardClick = (title) => {
    if (!onFilterChange?.current) return

    const statusMap = {
      "Всего подписчиков": null,
      "Оплатили": "оплачено",
      "Ожидают оплаты": "ожидает оплаты",
      "Оплата не прошла": "оплата не прошла",
    }

    const status = statusMap[title]
    onFilterChange.current.filterByStatus(status)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <SubscriberStat
          key={stat.title}
          {...stat}
          onClick={() => handleCardClick(stat.title)}
        />
      ))}
    </div>
  )
}

const SubscriberStat = ({ onClick, ...props }) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:bg-accent",
        onClick && "hover:border-primary"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-2">
        <CardTitle className="flex items-center gap-2">
          <props.icon size={16} />
          {props.title}
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <IconInfoCircle className="text-muted-foreground scale-90 stroke-[1.25]" />
              <span className="sr-only">Больше информации</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{props.desc}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-4xl font-bold">{props.stat}</div>
        <p className="text-muted-foreground text-xs">{props.statDesc}</p>
      </CardContent>
    </Card>
  )
}

