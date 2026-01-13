import { useState, useEffect } from "react"
import StatsCard from "./components/stats-card"
import TotalRevenue from "./components/total-revenue"
import RevenueChart from "./components/revenue-chart"
import PaymentChart from "./components/payment-chart"
import RecentPayments from "./components/recent-payments"
import { allStats } from "./data/data"
import { StatsCardSkeleton } from "@/components/ui/stats-card-skeleton"
import { ChartSkeleton } from "@/components/ui/chart-skeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TableSkeleton } from "@/components/ui/table-skeleton"

export default function Overview() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Симулируем загрузку данных
    const loadData = async () => {
      setIsLoading(true)
      // Небольшая задержка для демонстрации skeleton
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsLoading(false)
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-12" style={{ gridAutoRows: 'minmax(144px, auto)' }}>
        {/* Первый ряд: График (2 части) + Всего платежей (1 часть) + Успешные платежи (1 часть) = 2:1:1 */}
        <div className="col-span-3 md:col-span-6 lg:col-span-6 xl:col-span-6">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3">
              <Skeleton className="h-5 w-48" />
            </CardHeader>
            <CardContent className="flex flex-col justify-between pb-3 pt-0">
              <div className="flex flex-col space-y-0.5">
                <Skeleton className="h-10 w-32 mb-2" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-[64px] w-full mt-2" />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
          <StatsCardSkeleton />
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
          <StatsCardSkeleton />
        </div>
        
        {/* Второй ряд: Ожидающие платежи и Неудачные платежи */}
        <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
          <StatsCardSkeleton />
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
          <StatsCardSkeleton />
        </div>
        
        {/* Третий ряд: Количество возвратов и Сумма возвратов */}
        <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
          <StatsCardSkeleton />
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
          <StatsCardSkeleton />
        </div>
        
        {/* Графики */}
        <div className="col-span-3 md:col-span-6 lg:col-span-6">
          <ChartSkeleton />
        </div>
        <div className="col-span-3 md:col-span-6 lg:col-span-6">
          <ChartSkeleton />
        </div>
        
        {/* Таблица последних платежей */}
        <div className="col-span-3 md:col-span-6 lg:col-span-12">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48" />
            </CardHeader>
            <CardContent>
              <TableSkeleton rows={10} columns={5} showToolbar={true} showPagination={true} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-12" style={{ gridAutoRows: 'minmax(144px, auto)' }}>
      {/* Первый ряд: График (2 части) + Всего платежей (1 часть) + Успешные платежи (1 часть) = 2:1:1 */}
      <div className="col-span-3 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <TotalRevenue />
      </div>
      <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <StatsCard {...allStats[0]} />
      </div>
      <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <StatsCard {...allStats[1]} />
      </div>
      
      {/* Второй ряд: Ожидающие платежи и Неудачные платежи */}
      <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <StatsCard {...allStats[2]} />
      </div>
      <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <StatsCard {...allStats[3]} />
      </div>
      
      {/* Третий ряд: Количество возвратов (под Ожидающие платежи) и Сумма возвратов (под Неудачные платежи) */}
      <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <StatsCard {...allStats[4]} />
      </div>
      <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <StatsCard {...allStats[5]} />
      </div>
      
      {/* Графики и таблицы */}
      <div className="col-span-3 md:col-span-6 lg:col-span-6">
        <RevenueChart />
      </div>
      <div className="col-span-3 md:col-span-6 lg:col-span-6">
        <PaymentChart />
      </div>
      <div className="col-span-3 md:col-span-6 lg:col-span-12">
        <RecentPayments />
      </div>
    </div>
  )
}

