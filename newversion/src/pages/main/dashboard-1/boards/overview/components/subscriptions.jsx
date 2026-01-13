import { Bar, BarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  {
    revenue: 104,
    subscription: 240,
  },
  {
    revenue: 144,
    subscription: 300,
  },
  {
    revenue: 440,
    subscription: 200,
  },
  {
    revenue: 320,
    subscription: 278,
  },
  {
    revenue: 100,
    subscription: 189,
  },
  {
    revenue: 560,
    subscription: 239,
  },
  {
    revenue: 112,
    subscription: 278,
  },
  {
    revenue: 264,
    subscription: 189,
  },
]

const chartConfig = {
  revenue: {
    label: "Доход",
    color: "var(--chart-2)",
  },
  subscription: {
    label: "Подписки",
    color: "var(--chart-1)",
  },
}

export default function Subscription() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">Подписки</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-muted-foreground text-xs">+180.1% с прошлого месяца</p>
        <ChartContainer
          config={chartConfig}
          className="mt-6 h-[calc(100%_-_120px)] max-h-[205px] w-full"
        >
          <BarChart data={data}>
            <Bar
              dataKey="subscription"
              fill="var(--color-subscription)"
              radius={4}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
