import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { callTypes, productPaymentStatusTypes, subscriberTypes } from "../../data/data"
import { calculateSubscriberStatus } from "../../data/utils"
import { cn } from "@/lib/utils"

export function SubscriberDetailForm({ subscriber }) {
  const formatStatus = (statusText) => {
    if (!statusText) return statusText
    return statusText.charAt(0).toUpperCase() + statusText.slice(1).toLowerCase()
  }

  // Вычисляем статус на основе статусов продуктов
  const calculatedStatus = calculateSubscriberStatus(subscriber.products || [])
  const badgeColor = callTypes.get(calculatedStatus)
  const typeInfo = subscriberTypes.find((t) => t.value === subscriber.type)

  const isLegal = subscriber.type === "legal"

  return (
    <div className="flex flex-col items-start gap-4 lg:flex-row">
      <Card className="w-full lg:max-w-2xl lg:flex-auto lg:basis-9/12">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Обзор
            <div className="flex items-center gap-2">
              {typeInfo && typeInfo.icon && (
                <typeInfo.icon className="h-4 w-4" />
              )}
              <Badge variant="outline" className={cn(badgeColor)}>
                {formatStatus(calculatedStatus)}
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>
            {isLegal
              ? "Детали юридического лица, включая реквизиты компании, контактную информацию, статус и продукты."
              : "Детали физического лица, включая контактную информацию, статус и продукты."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {isLegal ? (
              // Поля для юридических лиц
              <>
                <div className="col-span-2 space-y-1">
                  <Label>Название компании</Label>
                  <Input
                    value={subscriber.companyName || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-1">
                  <Label>ИНН</Label>
                  <Input value={subscriber.inn || ""} readOnly className="bg-muted" />
                </div>

                <div className="space-y-1">
                  <Label>КПП</Label>
                  <Input value={subscriber.kpp || "—"} readOnly className="bg-muted" />
                </div>

                <div className="space-y-1">
                  <Label>ОГРН</Label>
                  <Input value={subscriber.ogrn || "—"} readOnly className="bg-muted" />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Юридический адрес</Label>
                  <Textarea
                    value={subscriber.legalAddress || ""}
                    readOnly
                    className="bg-muted resize-none"
                    rows={2}
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Контактное лицо</Label>
                  <Input
                    value={subscriber.contactPerson || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={subscriber.email || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Номер телефона</Label>
                  <Input
                    value={subscriber.phoneNumber || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Расчетный счет</Label>
                  <Input
                    value={subscriber.bankAccount || "—"}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Название банка</Label>
                  <Input
                    value={subscriber.bankName || "—"}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-1">
                  <Label>БИК</Label>
                  <Input value={subscriber.bik || "—"} readOnly className="bg-muted" />
                </div>
              </>
            ) : (
              // Поля для физических лиц
              <>
                <div className="space-y-1">
                  <Label>Фамилия</Label>
                  <Input
                    value={subscriber.lastName || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Имя</Label>
                  <Input
                    value={subscriber.firstName || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Отчество</Label>
                  <Input
                    value={subscriber.middleName || "—"}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={subscriber.email || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Номер телефона</Label>
                  <Input
                    value={subscriber.phoneNumber || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </>
            )}

            {subscriber.products && subscriber.products.length > 0 && (
              <div className="col-span-2 space-y-1">
                <Label>Продукты</Label>
                <p className="text-muted-foreground text-sm mb-4">
                  Продукты, на которые подписан пользователь.
                </p>
                <div className="space-y-4">
                  {subscriber.products.map((product) => {
                    const badgeColor = productPaymentStatusTypes.get(
                      product.paymentStatus
                    )
                    return (
                      <Card key={product.productId} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Link
                              to={`/products/${product.productId}`}
                              className="text-primary hover:underline font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {product.productName}
                            </Link>
                            <Badge variant="outline" className={cn(badgeColor)}>
                              {formatStatus(product.paymentStatus)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Дата подписки:{" "}
                              </span>
                              <span className="font-medium">
                                {format(product.subscribedAt, "dd MMMM, yyyy", {
                                  locale: ru,
                                })}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Дата оплаты:{" "}
                              </span>
                              <span className="font-medium">
                                {product.paymentDate
                                  ? format(product.paymentDate, "dd MMMM, yyyy", {
                                      locale: ru,
                                    })
                                  : "—"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

