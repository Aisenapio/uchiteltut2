import { Line, LineChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
]

const chartConfig = {
  revenue: {
    label: "Доход",
    color: "var(--primary)",
  },
  subscription: {
    label: "Ожидающие",
    color: "var(--primary)",
  },
}

export default function TotalRevenue() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3">
        <CardTitle>Общий доход от аренды</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between pb-3 pt-0">
        <div className="flex flex-col space-y-0.5">
          <div className="text-4xl font-bold">₽2,580,000</div>
          <p className="text-muted-foreground text-xs">+12.5% с прошлого месяца</p>
        </div>
        <ChartContainer config={chartConfig} className="h-[64px] w-full mt-2">
          <LineChart
            data={data}
            margin={{
              top: 4,
              right: 8,
              left: 8,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={1.6}
              dataKey="revenue"
              stroke="var(--color-revenue)"
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

