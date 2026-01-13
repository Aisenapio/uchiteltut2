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
import React from "react"

export default function StatsCard({
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
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-1.5 pt-3">
        <CardTitle className="flex items-center gap-1.5 truncate">
          <Icon size={11} />
          {label}
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <IconInfoCircle className="text-muted-foreground scale-75 stroke-[1.8]" />
              <span className="sr-only">Больше информации</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex flex-col justify-between pb-3 pt-0">
        <div className="flex flex-col space-y-0.5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-4xl font-bold">
              {sign === "money" && "₽"}
              {stats.toLocaleString("ru-RU")}
            </div>
            {chartData && (
              <ChartContainer className="w-[48px]" config={chartConfig}>
                <LineChart accessibilityLayer data={chartData}>
                  <Line
                    dataKey="value"
                    type="linear"
                    stroke="var(--color-day)"
                    strokeWidth={1.2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </div>
          <p className="text-muted-foreground text-xs">За этот месяц</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
          <div className="text-xs font-semibold">
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
            <p className={"text-xs leading-none font-medium"}>
              {percentage.toLocaleString("ru-RU")}%
            </p>
            {type === "up" ? (
              <IconCaretUpFilled size={13} />
            ) : (
              <IconCaretDownFilled size={13} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

