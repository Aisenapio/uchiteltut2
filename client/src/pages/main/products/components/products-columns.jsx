import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { categories, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <Link
          to={`/products/${row.getValue("id")}`}
          className="hover:text-primary w-[80px] font-mono text-sm underline"
        >
          {row.getValue("id")}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (cat) => cat.value === row.original.category
      )

      return (
        <div className="flex space-x-2">
          {category && <Badge variant="outline">{category.label}</Badge>}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Категория" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (cat) => cat.value === row.getValue("category")
      )

      if (!category) {
        return null
      }

      return <span>{category.label}</span>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Тип лица" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[140px] items-center">
          {status.icon && (
            <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Цена" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const currency = row.original.currency || "RUB"
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
      }).format(price)

      return <div className="font-medium">{formatted}</div>
    },
    sortingFn: (rowA, rowB) => {
      const priceA = parseFloat(rowA.getValue("price"))
      const priceB = parseFloat(rowB.getValue("price"))
      return priceA - priceB
    },
  },
  {
    accessorKey: "subscribers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Подписчики" />
    ),
    cell: ({ row }) => {
      const subscribers = row.getValue("subscribers")
      return <div className="text-center">{subscribers}</div>
    },
    sortingFn: (rowA, rowB) => {
      const subA = rowA.getValue("subscribers")
      const subB = rowB.getValue("subscribers")
      return subA - subB
    },
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Доход" />
    ),
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("revenue"))
      const currency = row.original.currency || "RUB"
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
      }).format(revenue)

      return <div className="font-medium">{formatted}</div>
    },
    sortingFn: (rowA, rowB) => {
      const revenueA = parseFloat(rowA.getValue("revenue"))
      const revenueB = parseFloat(rowB.getValue("revenue"))
      return revenueA - revenueB
    },
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата создания" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdDate"))
      return (
        <div className="text-sm">
          {format(date, "dd MMM yyyy", { locale: ru })}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("createdDate"))
      const dateB = new Date(rowB.getValue("createdDate"))
      return dateA.getTime() - dateB.getTime()
    },
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
]

