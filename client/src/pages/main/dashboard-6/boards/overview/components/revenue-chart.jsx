import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
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

const chartData = [
  { month: "Август", desktop: 73, mobile: 190 },
  { month: "Сентябрь", desktop: 20, mobile: 130 },
  { month: "Октябрь", desktop: 25, mobile: 165 },
  { month: "Ноябрь", desktop: 18, mobile: 145 },
  { month: "Декабрь", desktop: 15, mobile: 180 },
  { month: "Январь", desktop: 21, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Не оплачено",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Оплачено",
    color: "var(--chart-2)",
  },
}

export default function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 pt-3">
        <CardTitle>Статистика платежей</CardTitle>
        <CardDescription>Август 2024 - Январь 2025</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%_-_72px)]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer
            className="h-full min-h-[160px] w-full"
            config={chartConfig}
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="desktop"
                stackId="a"
                fill="var(--color-desktop)"
                radius={[0, 0, 3, 3]}
              />
              <Bar
                dataKey="mobile"
                stackId="a"
                fill="var(--color-mobile)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

