import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const chartData = [
  { source: "Google", amount: 186 },
  { source: "Social", amount: 305 },
  { source: "Direct", amount: 237 },
]
const chartConfig = {
  amount: {
    label: "Количество",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
}

export default function TrafficSourceCard() {
  const [duration, setDuration] = useState("week")
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Источник трафика</CardTitle>
          <Tabs
            onValueChange={(e) => {
              setDuration(e)
            }}
            defaultValue="week"
            value={duration}
          >
            <TabsList className="grid h-auto w-full grid-cols-2 p-[3px]">
              <TabsTrigger className="py-[3px]" value="month">
                Месяц
              </TabsTrigger>
              <TabsTrigger className="py-[3px]" value="week">
                Неделя
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>
          Получите представление о том, откуда приходят ваши посетители.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[200px] w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="source"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="amount"
              tickFormatter={(value) => value + "k"}
              type="number"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="amount"
              layout="vertical"
              fill="var(--color-amount)"
              barSize={14}
              radius={4}
            >
              <LabelList
                dataKey="amount"
                position="right"
                offset={4}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
