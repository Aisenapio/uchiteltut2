import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    id: "m5gr84i9",
    tenant: "ООО 'Торговый центр'",
    property: "ТЦ 'Мегаполис', офис 101",
    amount: 125000,
    status: "success",
    email: "manager@tc-megapolis.ru",
    dueDate: "2024-01-15",
  },
  {
    id: "3u1reuv4",
    tenant: "ИП Иванов И.И.",
    property: "ТЦ 'Мегаполис', магазин 205",
    amount: 85000,
    status: "success",
    email: "ivanov@example.com",
    dueDate: "2024-01-15",
  },
  {
    id: "derv1ws0",
    tenant: "ООО 'Ресторан Престиж'",
    property: "ТЦ 'Мегаполис', ресторан 301",
    amount: 180000,
    status: "processing",
    email: "info@prestige-rest.ru",
    dueDate: "2024-01-20",
  },
  {
    id: "bhqecj4p",
    tenant: "ООО 'Спортмастер'",
    property: "ТЦ 'Мегаполис', магазин 402",
    amount: 150000,
    status: "failed",
    email: "rent@sportmaster.ru",
    dueDate: "2024-01-10",
  },
  {
    id: "abc123de",
    tenant: "ИП Петров П.П.",
    property: "ТЦ 'Мегаполис', офис 203",
    amount: 95000,
    status: "processing",
    email: "petrov@example.com",
    dueDate: "2024-01-18",
  },
  {
    id: "xyz789fg",
    tenant: "ООО 'Салон красоты'",
    property: "ТЦ 'Мегаполис', салон 501",
    amount: 110000,
    status: "failed",
    email: "beauty@salon.ru",
    dueDate: "2024-01-12",
  },
]

const columns = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Выбрать строку"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tenant",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Арендатор
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("tenant")}</div>,
  },
  {
    accessorKey: "property",
    header: "Объект",
    cell: ({ row }) => <div className="text-sm">{row.getValue("property")}</div>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status")
      const statusMap = {
        success: "Оплачено",
        processing: "Ожидает оплаты",
        failed: "Ошибка оплаты",
      }
      const statusColors = {
        success: "text-emerald-600",
        processing: "text-yellow-600",
        failed: "text-red-600",
      }
      return (
        <div className={`capitalize ${statusColors[status] || ""}`}>
          {statusMap[status] || status}
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Сумма аренды</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a ruble amount
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "dueDate",
    header: "Срок оплаты",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"))
      return <div className="text-sm">{date.toLocaleDateString("ru-RU")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Копировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Просмотреть арендатора</DropdownMenuItem>
            <DropdownMenuItem>Просмотреть детали платежа</DropdownMenuItem>
            {payment.status === "failed" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Отправить напоминание
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Payments() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Арендаторы и платежи</CardTitle>
        <CardDescription>Управление арендаторами и их платежами.</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%)]">
        <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder="Поиск по арендатору..."
            value={(table.getColumn("tenant")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("tenant")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Столбцы <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-[calc(100%_-_52px)] rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Нет результатов.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
