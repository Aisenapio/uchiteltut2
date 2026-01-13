import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Link, Navigate, useParams } from "react-router"
import {
  IconCalendar,
  IconCoin,
  IconBuildingStore,
  IconCheck,
  IconClock,
  IconX,
  IconFileText,
  IconCreditCard,
} from "@tabler/icons-react"
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { recentPayments } from "../../dashboard-6/boards/overview/data/data"
import { cn } from "@/lib/utils"

export default function PaymentDetailPage() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [payment, setPayment] = useState(null)

  useEffect(() => {
    // Симулируем загрузку данных
    const loadData = async () => {
      setIsLoading(true)
      // Небольшая задержка для демонстрации skeleton
      await new Promise((resolve) => setTimeout(resolve, 500))
      const found = recentPayments.find((p) => p.id === id)
      setPayment(found)
      setIsLoading(false)
    }
    loadData()
  }, [id])

  if (!isLoading && !payment) {
    return <Navigate to="/" replace />
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="space-y-4 p-4">
          <div className="max-w-4xl">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Главная</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Skeleton className="h-4 w-24" />
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="max-w-4xl">
            <div className="mb-6">
              <Skeleton className="h-9 w-64 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="bg-card mb-6 grid grid-cols-1 gap-x-8 gap-y-4 rounded-lg border p-6 md:grid-cols-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  const statusMap = {
    success: { label: "Успешно", icon: IconCheck, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" },
    pending: { label: "Ожидает", icon: IconClock, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    failed: { label: "Ошибка", icon: IconX, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  }

  const statusInfo = statusMap[payment.status] || statusMap.pending
  const StatusIcon = statusInfo.icon

  const formattedAmount = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(payment.amount)

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Детали платежа</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="max-w-4xl">
          {/* Payment Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">Детали платежа</h1>
              <Badge variant="outline" className={cn("gap-1.5", statusInfo.color)}>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusInfo.label}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconFileText className="h-4 w-4" />
              <span className="font-mono text-sm">{payment.id}</span>
            </div>
          </div>

          {/* Payment Information Grid */}
          <div className="bg-card mb-6 grid grid-cols-1 gap-x-8 gap-y-4 rounded-lg border p-6 text-sm md:grid-cols-2">
            {/* Left Column - Payment Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-32">Сумма платежа</span>
                <div className="flex items-center gap-1">
                  <IconCoin className="text-muted-foreground h-3.5 w-3.5" />
                  <span className="text-lg font-semibold">{formattedAmount}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-32">Дата платежа</span>
                <div className="flex items-center gap-1">
                  <IconCalendar className="text-muted-foreground h-3.5 w-3.5" />
                  <span>
                    {format(new Date(payment.date), "dd MMMM yyyy", { locale: ru })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-32">Статус</span>
                <Badge variant="outline" className={cn("gap-1.5", statusInfo.color)}>
                  <StatusIcon className="h-3.5 w-3.5" />
                  {statusInfo.label}
                </Badge>
              </div>
            </div>

            {/* Right Column - Organization & Property Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-32">Организация</span>
                <div className="flex items-center gap-1">
                  <IconBuildingStore className="text-muted-foreground h-3.5 w-3.5" />
                  <span className="font-medium">{payment.organization}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-32">Объект</span>
                <span className="font-medium">{payment.property}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-32">Метод оплаты</span>
                <div className="flex items-center gap-1">
                  <IconCreditCard className="text-muted-foreground h-3.5 w-3.5" />
                  <span>Банковская карта</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Payment Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Информация о платеже</CardTitle>
                <CardDescription>Детальная информация о транзакции</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ID транзакции</span>
                    <span className="font-mono font-medium">{payment.id}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Дата создания</span>
                    <span>
                      {format(new Date(payment.date), "dd.MM.yyyy HH:mm", { locale: ru })}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Сумма</span>
                    <span className="font-semibold">{formattedAmount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Валюта</span>
                    <span>RUB (₽)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Информация о плательщике</CardTitle>
                <CardDescription>Данные организации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Организация</span>
                    <span className="font-medium text-right max-w-[60%]">
                      {payment.organization}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Объект</span>
                    <span className="font-medium text-right max-w-[60%]">
                      {payment.property}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Тип объекта</span>
                    <span>
                      {payment.property.includes("офис")
                        ? "Офис"
                        : payment.property.includes("магазин")
                        ? "Магазин"
                        : payment.property.includes("ресторан") || payment.property.includes("кафе")
                        ? "Общепит"
                        : payment.property.includes("салон")
                        ? "Салон"
                        : "Другое"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status-Specific Actions */}
          {payment.status === "pending" && (
            <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconClock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">
                        Платеж ожидает обработки
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Ожидайте подтверждения платежа от платежной системы
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-yellow-300 dark:border-yellow-700">
                    Обновить статус
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {payment.status === "failed" && (
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconX className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="font-medium text-red-900 dark:text-red-100">
                        Платеж не прошел
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Транзакция была отклонена. Проверьте данные платежа и попробуйте снова
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-red-300 dark:border-red-700">
                    Отправить напоминание
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {payment.status === "success" && (
            <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="font-medium text-emerald-900 dark:text-emerald-100">
                        Платеж успешно обработан
                      </p>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        Транзакция завершена. Денежные средства получены
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-emerald-300 dark:border-emerald-700">
                    Скачать чек
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-6">
            <Button variant="outline" asChild>
              <Link to="/">Вернуться к панели управления</Link>
            </Button>
            <Button variant="outline">Экспортировать данные</Button>
            <Button variant="outline">Распечатать</Button>
          </div>
        </div>
      </div>
    </>
  )
}

