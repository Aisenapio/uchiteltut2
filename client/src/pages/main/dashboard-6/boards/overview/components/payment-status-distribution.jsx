import { Pie, PieChart, Cell, Label } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { paymentStatusData } from "../data/data"

const chartConfig = {
  successful: {
    label: "Успешные",
    color: "#22c55e",
  },
  pending: {
    label: "Ожидающие",
    color: "#f59e0b",
  },
  failed: {
    label: "Неудачные",
    color: "#ef4444",
  },
}

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"]

export default function PaymentStatusDistribution() {
  const total = paymentStatusData.reduce((acc, curr) => acc + curr.value, 0)

  const chartData = paymentStatusData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 pt-3">
        <CardTitle className="text-xs font-medium">Распределение платежей</CardTitle>
        <CardDescription className="text-xs">
          Статусы платежей за текущий период
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%_-_72px)]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[160px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={40}
              outerRadius={64}
              strokeWidth={4}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-lg font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground text-xs"
                        >
                          Всего
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-3 flex flex-col gap-1.5 text-xs">
          {paymentStatusData.map((item, index) => (
            <div key={item.status} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span>{item.status}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

