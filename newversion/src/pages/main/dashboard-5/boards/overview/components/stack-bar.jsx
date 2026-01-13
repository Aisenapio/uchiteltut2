import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 18, mobile: 80 },
  { month: "February", desktop: 30, mobile: 200 },
  { month: "March", desktop: 23, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 20, mobile: 130 },
  { month: "June", desktop: 21, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Не оплачено",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Оплачено",
    color: "var(--chart-2)",
  },
};

export default function StackBar() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Статистика платежей</CardTitle>
        <CardDescription>Январь - Июнь 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%_-_90px)]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer
            className="h-full min-h-[200px] w-full"
            config={chartConfig}
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="desktop"
                stackId="a"
                fill="var(--color-desktop)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="mobile"
                stackId="a"
                fill="var(--color-mobile)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
