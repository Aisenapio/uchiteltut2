import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconInfoCircle,
} from "@tabler/icons-react"
import { Line, LineChart } from "recharts"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { revenueStats } from "../data/data"
import React from "react"

export default function RevenueStats() {
  return (
    <>
      {revenueStats.map((stats) => (
        <StatsCard key={stats.label} className="col-span-3 lg:col-span-2 xl:col-span-2" {...stats} />
      ))}
    </>
  )
}

function StatsCard({
  label,
  description,
  stats,
  type,
  percentage,
  chartData,
  strokeColor,
  icon: Icon,
  sign = "number",
  change,
  className,
}) {
  const chartConfig = {
    day: {
      label: "day",
      color: strokeColor,
    },
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-5 space-y-0 pt-2 pb-2">
        <CardTitle className="flex items-center gap-2 truncate text-sm font-medium">
          <Icon size={16} />
          {label}
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <IconInfoCircle className="text-muted-foreground scale-90 stroke-[1.8]" />
              <span className="sr-only">Больше информации</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex h-[calc(100%_-_48px)] flex-col justify-between py-4">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="text-3xl font-bold">
              {sign === "money" && "₽"}
              {stats.toLocaleString("ru-RU")}
            </div>
            <ChartContainer className="w-[70px]" config={chartConfig}>
              <LineChart accessibilityLayer data={chartData}>
                <Line
                  dataKey="value"
                  type="linear"
                  stroke="var(--color-day)"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
          <p className="text-muted-foreground text-xs">За этот месяц</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="text-sm font-semibold">
            {change && (
              <span className={cn("text-xs", {
                "text-emerald-500": type === "up",
                "text-red-500": type === "down",
              })}>
                {type === "up" ? "+" : "-"}
                {sign === "money" && "₽"}
                {Math.abs(change).toLocaleString("ru-RU")}
              </span>
            )}
          </div>
          <div
            className={cn("flex items-center gap-1", {
              "text-emerald-500 dark:text-emerald-400": type === "up",
              "text-red-500 dark:text-red-400": type === "down",
            })}
          >
            <p className={"text-[14px] leading-none font-medium"}>
              {percentage.toLocaleString("ru-RU")}%
            </p>
            {type === "up" ? (
              <IconCaretUpFilled size={18} />
            ) : (
              <IconCaretDownFilled />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

