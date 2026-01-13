import { useRef, useState, useEffect } from "react"
import { Link } from "react-router"
import { Header } from "@/components/layout/header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { columns } from "./components/subscribers-columns"
import { SubscribersStats } from "./components/subscribers-stats"
import { SubscribersTable } from "./components/subscribers-table"
import { subscriberListSchema } from "./data/schema"
import { getSubscribers } from "./data/subscribers"
import { StatsGridSkeleton } from "@/components/ui/stats-card-skeleton"
import { TableSkeleton } from "@/components/ui/table-skeleton"

export default function SubscribersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [subscriberList, setSubscriberList] = useState([])
  const tableRef = useRef(null)

  useEffect(() => {
    // Симулируем загрузку данных
    const loadData = async () => {
      setIsLoading(true)
      // Небольшая задержка для демонстрации skeleton
      await new Promise(resolve => setTimeout(resolve, 500))
      const subscribers = getSubscribers()
      const parsed = subscriberListSchema.parse(subscribers)
      setSubscriberList(parsed)
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <div className="flex w-full flex-col gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Подписчики</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Список подписчиков</h1>
          </div>
        </div>
        {isLoading ? (
          <>
            <StatsGridSkeleton count={4} />
            <div className="flex-1">
              <TableSkeleton rows={10} columns={8} showToolbar={true} showPagination={true} />
            </div>
          </>
        ) : (
          <>
            <SubscribersStats onFilterChange={tableRef} />
            <div className="flex-1">
              <SubscribersTable ref={tableRef} data={subscriberList} columns={columns} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
