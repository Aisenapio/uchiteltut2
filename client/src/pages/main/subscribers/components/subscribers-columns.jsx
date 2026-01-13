import { format } from "date-fns"
import { Link } from "react-router"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import LongText from "@/components/long-text"
import { callTypes, subscriberTypes } from "../data/data"
import { calculateSubscriberStatus } from "../data/utils"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Выбрать все"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted pr-2! md:pr-0"
      ),
    },
    cell: ({ row }) => (
      <div data-prevent-row-click onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Выбрать строку"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Наименование" />
    ),
    cell: ({ row }) => {
      const subscriber = row.original
      let displayName = ""
      
      if (subscriber.type === "legal") {
        displayName = subscriber.companyName || ""
      } else {
        const { firstName, lastName, middleName } = subscriber
        displayName = [lastName, firstName, middleName].filter(Boolean).join(" ") || ""
      }
      
      // Получаем информацию о типе для отображения иконки
      const typeInfo = subscriberTypes.find((t) => t.value === subscriber.type)
      const Icon = typeInfo?.icon
      
      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
          <Button variant="link" className="underline p-0 h-auto" asChild>
            <Link to={`/subscribers/${subscriber.id}`}>
              <LongText className="max-w-36">{displayName}</LongText>
            </Link>
          </Button>
        </div>
      )
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер телефона" />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата регистрации" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {format(row.getValue("createdAt"), "dd MMM, yyyy")}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "lastLoginAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата оплаты" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {format(row.getValue("lastLoginAt"), "dd MMM, yyyy")}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Продукты" />
    ),
    cell: ({ row }) => {
      const products = row.getValue("products") || []
      if (products.length === 0) {
        return <div className="text-muted-foreground">—</div>
      }
      return (
        <div className="flex flex-col gap-1 max-w-48">
          {products.map((product) => (
            <div key={product.productId} className="text-sm">
              <LongText className="max-w-48">{product.productName}</LongText>
            </div>
          ))}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
    cell: ({ row }) => {
      // Вычисляем статус на основе статусов продуктов
      const products = row.original.products || []
      const status = calculateSubscriberStatus(products)
      const badgeColor = callTypes.get(status)
      const formatStatus = (statusText) => {
        if (!statusText) return statusText
        return statusText.charAt(0).toUpperCase() + statusText.slice(1).toLowerCase()
      }
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn(badgeColor)}>
            {formatStatus(status)}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      // Используем вычисленный статус для фильтрации
      const products = row.original.products || []
      const status = calculateSubscriberStatus(products)
      return value.includes(status)
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
]

