import { useState, useEffect, useRef } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import {
  IconCalendar,
  IconCoin,
  IconPackage,
  IconUsers,
  IconTrendingUp,
  IconPlus,
  IconFileUpload,
  IconX,
} from "@tabler/icons-react"
import { Link, Navigate, useParams, useNavigate } from "react-router"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/copy-button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { categories, statuses } from "../data/data"
import { productListSchema } from "../data/schema"
import { products } from "../data/products"
import { Header } from "@/components/layout/header"
import { getSubscribers } from "../../subscribers/data/subscribers"
import { productPaymentStatusTypes } from "../../subscribers/data/data"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [subscribersWithProductInfo, setSubscribersWithProductInfo] = useState([])
  const [isAddSubscriberDialogOpen, setIsAddSubscriberDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    inn: "",
    kpp: "",
    ogrn: "",
    companyName: "",
    legalAddress: "",
    contactNumber: "",
  })
  const [documents, setDocuments] = useState([])
  const fileInputRef = useRef(null)
  const [paymentLink, setPaymentLink] = useState("")
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const [currentMonthStats, setCurrentMonthStats] = useState({
    subscribers: 0,
    revenue: 0,
  })
  
  // Генерируем ссылку для оплаты (заглушка)
  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      setPaymentLink(`${window.location.origin}/dashboard/payment/${id}`)
    }
  }, [id])

  // Генерируем данные для графика дохода по месяцам
  useEffect(() => {
    if (product) {
      // Генерируем данные за последние 6 месяцев
      const months = []
      const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
      ]
      
      const now = new Date()
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthIndex = date.getMonth()
        const baseRevenue = product.revenue / 6
        
        // Добавляем некоторую вариативность (±30%)
        const variation = (Math.random() - 0.5) * 0.6
        const monthlyRevenue = baseRevenue * (1 + variation)
        
        months.push({
          month: monthNames[monthIndex],
          monthShort: monthNames[monthIndex].slice(0, 3),
          revenue: Math.round(monthlyRevenue),
        })
      }
      
      setMonthlyRevenue(months)
      
      // Устанавливаем статистику за текущий месяц (последний в массиве)
      const currentMonthData = months[months.length - 1]
      setCurrentMonthStats({
        subscribers: product.subscribers,
        revenue: currentMonthData.revenue,
      })
    }
  }, [product])

  useEffect(() => {
    // Симулируем загрузку данных
    const loadData = async () => {
      setIsLoading(true)
      // Небольшая задержка для демонстрации skeleton
      await new Promise(resolve => setTimeout(resolve, 500))
      const productList = productListSchema.parse(products)
      const found = productList.find((p) => p.id === id)
      setProduct(found)

      if (found) {
        // Получаем всех подписчиков и фильтруем тех, у кого есть этот продукт
        const allSubscribers = getSubscribers()
        const productSubscribers = allSubscribers.filter((subscriber) =>
          subscriber.products?.some((p) => p.productId === id)
        )

        // Для каждого подписчика получаем информацию о его подписке на этот продукт
        const subscribersWithInfo = productSubscribers.map((subscriber) => {
          const productInfo = subscriber.products.find((p) => p.productId === id)
          return {
            ...subscriber,
            productInfo,
          }
        })
        setSubscribersWithProductInfo(subscribersWithInfo)
      }

      setIsLoading(false)
    }
    loadData()
  }, [id])

  if (!isLoading && !product) {
    return <Navigate to="/products" replace />
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="space-y-4 p-4">
          <div className="max-w-3xl">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Главная</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/products">Продукты</Link>
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

          <div className="max-w-3xl">
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

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="text-sm">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-32" />
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    )
  }

  const status = statuses.find((s) => s.value === product.status)
  const category = categories.find((c) => c.value === product.category)

  const formatStatus = (statusText) => {
    if (!statusText) return statusText
    return statusText.charAt(0).toUpperCase() + statusText.slice(1).toLowerCase()
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddDocument = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newDocuments = files.map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        file: file,
      }))
      setDocuments((prev) => [...prev, ...newDocuments])
    }
    // Сброс input для возможности повторной загрузки того же файла
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveDocument = (docId) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
  }

  const handleSubmit = () => {
    // Здесь будет логика сохранения подписчика
    console.log("Form data:", formData)
    console.log("Documents:", documents)
    // Закрываем диалог и сбрасываем форму
    setIsAddSubscriberDialogOpen(false)
    setFormData({
      inn: "",
      kpp: "",
      ogrn: "",
      companyName: "",
      legalAddress: "",
      contactNumber: "",
    })
    setDocuments([])
  }

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        {/* Breadcrumb Navigation */}
        <div className="max-w-3xl">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Продукты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="max-w-3xl">
          {/* Product Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            {category && (
              <Badge variant="outline" className="mt-2">
                {category.label}
              </Badge>
            )}
          </div>

          {/* Product Metadata Grid */}
          <div className="bg-card mb-6 grid grid-cols-1 gap-x-8 gap-y-4 rounded-lg border p-6 text-sm md:grid-cols-2">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-24">Тип лица</span>
                <div className="flex items-center gap-1">
                  {status && status.icon && (
                    <status.icon className="h-3.5 w-3.5" />
                  )}
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      status?.value === "legal"
                        ? "border-blue-200 bg-blue-100 text-blue-700"
                        : status?.value === "individual"
                          ? "border-purple-200 bg-purple-100 text-purple-700"
                          : ""
                    }`}
                  >
                    {status?.label}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-24">Категория</span>
                <span>{category?.label}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-24">Цена</span>
                <span>
                  {new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: product.currency || "RUB",
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-24">Создан</span>
                <div className="flex items-center gap-1">
                  <IconCalendar className="text-muted-foreground h-3.5 w-3.5" />
                  <span>
                    {format(product.createdDate, "dd MMM yyyy", { locale: ru })}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-24">Подписчики</span>
                <div className="flex items-center gap-1">
                  <IconUsers className="text-muted-foreground h-3.5 w-3.5" />
                  <span>{product.subscribers}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-24">Доход</span>
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="text-muted-foreground h-3.5 w-3.5" />
                  <span>
                    {new Intl.NumberFormat("ru-RU", {
                      style: "currency",
                      currency: product.currency || "RUB",
                      minimumFractionDigits: 0,
                    }).format(product.revenue)}
                  </span>
                </div>
              </div>
            </div>

            {/* Кнопка добавить подписчика */}
            <div className="col-span-full pt-4 border-t">
              <Button
                onClick={() => setIsAddSubscriberDialogOpen(true)}
                className="gap-2"
              >
                <IconPlus className="h-4 w-4" />
                Добавить подписчика
              </Button>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full mb-6">
            <TabsList className="text-sm">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="subscribers">
                Подписчики ({subscribersWithProductInfo.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              {/* Product Description Content */}
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p>
                  {product.description ||
                    "Описание продукта отсутствует. Добавьте описание, чтобы предоставить больше информации о продукте."}
                </p>

                {/* Карточки статистики */}
                {product && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-6">
                    {/* Карточка Подписчики */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <IconUsers className="h-4 w-4" />
                          Подписчики
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{currentMonthStats.subscribers || product.subscribers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          За этот месяц
                        </p>
                      </CardContent>
                    </Card>

                    {/* Карточка Доход за месяц */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <IconTrendingUp className="h-4 w-4" />
                          Доход за месяц
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {new Intl.NumberFormat("ru-RU", {
                            style: "currency",
                            currency: product.currency || "RUB",
                            minimumFractionDigits: 0,
                          }).format(currentMonthStats.revenue || 0)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          За этот месяц
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* График дохода по месяцам */}
                {product && monthlyRevenue.length > 0 && (
                  <Card className="mt-6 mb-6">
                    <CardHeader>
                      <CardTitle>Доход по месяцам</CardTitle>
                      <CardDescription>Динамика дохода за последние 6 месяцев</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          revenue: {
                            label: "Доход",
                            color: "var(--chart-1)",
                          },
                        }}
                        className="h-[300px] w-full"
                      >
                        <LineChart
                          data={monthlyRevenue}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis
                            dataKey="monthShort"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                formatter={(value) =>
                                  new Intl.NumberFormat("ru-RU", {
                                    style: "currency",
                                    currency: product.currency || "RUB",
                                    minimumFractionDigits: 0,
                                  }).format(value)
                                }
                              />
                            }
                          />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-revenue)"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            <TabsContent value="subscribers" className="mt-4">
              <div className="space-y-4">
                {subscribersWithProductInfo.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      У этого продукта пока нет подписчиков
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {subscribersWithProductInfo.map((subscriber) => {
                      const badgeColor = productPaymentStatusTypes.get(
                        subscriber.productInfo.paymentStatus
                      )
                      
                      // Определяем отображаемое имя в зависимости от типа
                      let displayName = ""
                      if (subscriber.type === "legal") {
                        displayName = subscriber.companyName || ""
                      } else {
                        const { firstName, lastName, middleName } = subscriber
                        displayName = [lastName, firstName, middleName].filter(Boolean).join(" ") || ""
                      }
                      
                      return (
                        <Card
                          key={subscriber.id}
                          className="cursor-pointer transition-colors hover:bg-muted/50"
                          onClick={() => navigate(`/subscribers/${subscriber.id}`)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <Link
                                    to={`/subscribers/${subscriber.id}`}
                                    className="font-medium hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {displayName}
                                  </Link>
                                  <Badge variant="outline" className={cn(badgeColor)}>
                                    {formatStatus(subscriber.productInfo.paymentStatus)}
                                  </Badge>
                                </div>
                                <div className="text-muted-foreground text-sm">
                                  {subscriber.email}
                                </div>
                                {subscriber.type === "legal" && subscriber.contactPerson && (
                                  <div className="text-muted-foreground text-sm">
                                    Контактное лицо: {subscriber.contactPerson}
                                  </div>
                                )}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">
                                      Дата подписки:{" "}
                                    </span>
                                    <span className="font-medium">
                                      {format(
                                        subscriber.productInfo.subscribedAt,
                                        "dd MMMM, yyyy",
                                        { locale: ru }
                                      )}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Дата оплаты:{" "}
                                    </span>
                                    <span className="font-medium">
                                      {subscriber.productInfo.paymentDate
                                        ? format(
                                            subscriber.productInfo.paymentDate,
                                            "dd MMMM, yyyy",
                                            { locale: ru }
                                          )
                                        : "—"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialog: Добавить подписчика */}
      <Dialog open={isAddSubscriberDialogOpen} onOpenChange={setIsAddSubscriberDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить подписчика</DialogTitle>
            <DialogDescription>
              Заполните информацию о новом подписчике для этого продукта
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* QR Code и ссылка для оплаты */}
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <Label className="text-sm font-medium">QR код для оплаты</Label>
                  <div className="w-48 h-48 bg-white border-2 border-muted-foreground/25 rounded-lg flex items-center justify-center p-2">
                    <div className="w-full h-full bg-black/5 rounded grid grid-cols-10 grid-rows-10 gap-0.5 p-1">
                      {/* Имитация QR кода - фиксированный паттерн */}
                      {Array.from({ length: 100 }).map((_, i) => {
                        // Создаем фиксированный паттерн для имитации QR кода
                        const row = Math.floor(i / 10)
                        const col = i % 10
                        const shouldFill = 
                          (row === 0 || row === 9 || col === 0 || col === 9) ||
                          (row >= 2 && row <= 6 && col >= 2 && col <= 6) ||
                          ((row === 2 || row === 6) && (col === 2 || col === 6)) ||
                          ((row === 3 || row === 5) && (col === 3 || col === 5)) ||
                          (row === 4 && col === 4) ||
                          (row + col) % 3 === 0 && row > 8
                        return (
                          <div
                            key={i}
                            className={shouldFill ? "bg-black" : "bg-transparent"}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <Label className="text-sm font-medium">Ссылка для оплаты</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={paymentLink}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <CopyButton text={paymentLink} />
                  </div>
                </div>
              </div>
            </div>

            {/* Форма с полями */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inn">ИНН</Label>
                <Input
                  id="inn"
                  value={formData.inn}
                  onChange={(e) => handleInputChange("inn", e.target.value)}
                  placeholder="Введите ИНН"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kpp">КПП</Label>
                <Input
                  id="kpp"
                  value={formData.kpp}
                  onChange={(e) => handleInputChange("kpp", e.target.value)}
                  placeholder="Введите КПП"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogrn">ОГРН</Label>
                <Input
                  id="ogrn"
                  value={formData.ogrn}
                  onChange={(e) => handleInputChange("ogrn", e.target.value)}
                  placeholder="Введите ОГРН"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Название компании</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Введите название компании"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="legalAddress">Юридический адрес</Label>
                <Input
                  id="legalAddress"
                  value={formData.legalAddress}
                  onChange={(e) => handleInputChange("legalAddress", e.target.value)}
                  placeholder="Введите юридический адрес"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Контактный номер</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  placeholder="Введите контактный номер"
                  type="tel"
                />
              </div>
            </div>

            {/* Загруженные документы */}
            {documents.length > 0 && (
              <div className="space-y-2">
                <Label>Загруженные документы</Label>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <IconFileUpload className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{doc.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          ({(doc.size / 1024).toFixed(2)} KB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRemoveDocument(doc.id)}
                        className="shrink-0"
                      >
                        <IconX className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопка добавления документа */}
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddDocument}
                className="w-full gap-2"
              >
                <IconFileUpload className="h-4 w-4" />
                Добавить документ
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddSubscriberDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button onClick={handleSubmit}>Добавить подписчика</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

