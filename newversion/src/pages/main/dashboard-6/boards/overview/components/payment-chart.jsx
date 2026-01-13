import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { paymentChartData } from "../data/data"

const chartConfig = {
  successful: {
    label: "Успешные",
    color: "#22c55e",
  },
  failed: {
    label: "Неудачные",
    color: "#ef4444",
  },
  pending: {
    label: "Ожидающие",
    color: "#f59e0b",
  },
}

export default function PaymentChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 pt-3">
        <CardTitle>Статус платежей</CardTitle>
        <CardDescription>
          Распределение платежей по статусам за последние 6 месяцев
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%_-_72px)]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={paymentChartData}
            margin={{
              left: 10,
              right: 10,
              top: 8,
              bottom: 0,
            }}
          >
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={6}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSuccessful" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#ef4444"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#ef4444"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#f59e0b"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#f59e0b"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="successful"
              type="natural"
              fill="url(#fillSuccessful)"
              fillOpacity={0.4}
              stroke="#22c55e"
              stackId="a"
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="url(#fillPending)"
              fillOpacity={0.4}
              stroke="#f59e0b"
              stackId="a"
            />
            <Area
              dataKey="failed"
              type="natural"
              fill="url(#fillFailed)"
              fillOpacity={0.4}
              stroke="#ef4444"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

