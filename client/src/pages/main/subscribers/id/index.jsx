import { useState, useEffect } from "react"
import { Link, Navigate, useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { subscriberListSchema } from "../data/schema"
import { getSubscribers } from "../data/subscribers"
import { SubscriberDetailForm } from "./components/subscriber-detail-form"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SubscriberDetailPage() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [subscriber, setSubscriber] = useState(null)

  useEffect(() => {
    // Симулируем загрузку данных
    const loadData = async () => {
      setIsLoading(true)
      // Небольшая задержка для демонстрации skeleton
      await new Promise(resolve => setTimeout(resolve, 500))
      const subscribers = getSubscribers()
      const subscriberList = subscriberListSchema.parse(subscribers)
      const found = subscriberList.find((s) => s.id === id)
      setSubscriber(found)
      setIsLoading(false)
    }
    loadData()
  }, [id])

  if (!isLoading && !subscriber) {
    return <Navigate to="/subscribers" replace />
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="space-y-4 p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/subscribers">Подписчики</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Детали</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="space-y-1">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }

  // Определяем отображаемое имя в зависимости от типа
  let displayName = ""
  if (subscriber.type === "legal") {
    displayName = subscriber.companyName || ""
  } else {
    const { firstName, lastName, middleName } = subscriber
    displayName = [lastName, firstName, middleName].filter(Boolean).join(" ") || ""
  }

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Главная</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/subscribers">Подписчики</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Детали</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-1">
          <div className="flex flex-wrap gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Детали подписчика: {displayName}
            </h1>
            <Badge variant="outline" className="text-muted-foreground">
              {subscriber.id}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Подробная информация о подписчике, включая детали, статус и информацию о продукте.
          </p>
        </div>

        <div className="mt-4">
          <SubscriberDetailForm subscriber={subscriber} />
        </div>
      </div>
    </>
  )
}

