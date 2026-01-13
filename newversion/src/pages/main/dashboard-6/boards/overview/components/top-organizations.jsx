import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { topOrganizations } from "../data/data"

export default function TopOrganizations() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 pt-3">
        <CardTitle className="text-xs font-medium">Топ организаций</CardTitle>
        <CardDescription className="text-xs">
          Организации с наибольшим доходом за период
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%_-_72px)]">
        <div className="space-y-3">
          {topOrganizations.map((org, index) => (
            <div
              key={org.id}
              className="flex items-center justify-between rounded-lg border p-2.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="text-xs font-medium">{org.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {org.payments} платежей
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="text-xs font-bold">
                  ₽{org.revenue.toLocaleString("ru-RU")}
                </div>
                <Badge
                  variant="outline"
                  className={cn("text-xs", {
                    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200":
                      org.status === "active",
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200":
                      org.status === "pending",
                  })}
                >
                  {org.status === "active" ? "Активна" : "Ожидает"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

