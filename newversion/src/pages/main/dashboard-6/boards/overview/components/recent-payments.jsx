import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Cross2Icon, CheckIcon, PlusCircledIcon, ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { recentPayments } from "../data/data"
import { format, isWithinInterval, subDays } from "date-fns"
import { ru } from "date-fns/locale"
import { useNavigate } from "react-router"

// Данные для фильтров
const statusOptions = [
  { label: "Успешно", value: "success" },
  { label: "Ожидает", value: "pending" },
  { label: "Ошибка", value: "failed" },
]

const dateOptions = [
  { label: "На неделю", value: "week" },
  { label: "На месяц", value: "month" },
  { label: "На квартал", value: "quarter" },
  { label: "На полгода", value: "halfYear" },
]

// Компонент заголовка колонки с сортировкой
function DataTableColumnHeader({ column, title, className, align = "left" }) {
  if (!column.getCanSort()) {
    return <div className={cn("text-sm font-medium", align === "right" && "text-right", className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center", align === "right" ? "justify-end" : "justify-start", "space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="data-[state=open]:bg-accent -ml-3 h-7 text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDownIcon className="ml-2 h-3 w-3" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        ) : (
          <CaretSortIcon className="ml-2 h-3 w-3" />
        )}
      </Button>
    </div>
  )
}

// Компонент фильтра (точно как в tasks)
function DataTableFacetedFilter({ column, title, options }) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() || [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Результаты не найдены</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Очистить фильтры
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Компонент toolbar с фильтрами
function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <div className="flex gap-x-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Статус"
              options={statusOptions}
            />
          )}
          {table.getColumn("date") && (
            <DataTableFacetedFilter
              column={table.getColumn("date")}
              title="Дата"
              options={dateOptions}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Сбросить
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

const createColumns = (navigate) => [
  {
    accessorKey: "id",
    header: () => <div className="text-sm font-medium">ID</div>,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("id")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "organization",
    header: () => <div className="text-sm font-medium">Организация</div>,
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.getValue("organization")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "property",
    header: () => <div className="text-sm font-medium">Объект</div>,
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("property")}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right text-sm font-medium">Сумма</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      }).format(amount)

      return <div className="text-right text-sm font-medium">{formatted}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-sm font-medium">Статус</div>,
    cell: ({ row }) => {
      const status = row.getValue("status")
      const statusMap = {
        success: "Успешно",
        pending: "Ожидает",
        failed: "Ошибка",
      }
      const statusColors = {
        success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      }
      return (
        <Badge
          variant="outline"
          className={cn("capitalize", statusColors[status])}
        >
          {statusMap[status]}
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      if (!value || !Array.isArray(value) || value.length === 0) return true
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return (
        <div className="text-sm">
          {format(date, "dd MMM yyyy", { locale: ru })}
        </div>
      )
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("date"))
      const dateB = new Date(rowB.getValue("date"))
      return dateA.getTime() - dateB.getTime()
    },
    filterFn: (row, id, value) => {
      if (!value || !Array.isArray(value) || value.length === 0) return true
      const dateString = row.getValue(id)
      const date = new Date(dateString)
      const now = new Date()
      
      // Нормализуем дату из данных (убираем время, оставляем только дату)
      const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      
      return value.some((filterValue) => {
        switch (filterValue) {
          case "week": {
            // Последние 7 дней от текущей даты
            const weekStart = subDays(now, 6)
            weekStart.setHours(0, 0, 0, 0)
            const weekEnd = new Date(now)
            weekEnd.setHours(23, 59, 59, 999)
            return isWithinInterval(normalizedDate, { start: weekStart, end: weekEnd })
          }
          case "month": {
            // Последние 30 дней от текущей даты
            const monthStart = subDays(now, 29)
            monthStart.setHours(0, 0, 0, 0)
            const monthEnd = new Date(now)
            monthEnd.setHours(23, 59, 59, 999)
            return isWithinInterval(normalizedDate, { start: monthStart, end: monthEnd })
          }
          case "quarter": {
            // Последние 90 дней от текущей даты (примерно 3 месяца)
            const quarterStart = subDays(now, 89)
            quarterStart.setHours(0, 0, 0, 0)
            const quarterEnd = new Date(now)
            quarterEnd.setHours(23, 59, 59, 999)
            return isWithinInterval(normalizedDate, { start: quarterStart, end: quarterEnd })
          }
          case "halfYear": {
            // Последние 180 дней от текущей даты (примерно 6 месяцев)
            const halfYearStart = subDays(now, 179)
            halfYearStart.setHours(0, 0, 0, 0)
            const halfYearEnd = new Date(now)
            halfYearEnd.setHours(23, 59, 59, 999)
            return isWithinInterval(normalizedDate, { start: halfYearStart, end: halfYearEnd })
          }
          default:
            return false
        }
      })
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
            <Button 
              variant="ghost" 
              className="h-6 w-6 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(payment.id)
              }}
            >
              Копировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/payments/${payment.id}`)
              }}
            >
              Просмотреть детали
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => e.stopPropagation()}
            >
              Экспортировать
            </DropdownMenuItem>
            {payment.status === "failed" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={(e) => e.stopPropagation()}
                >
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

export default function RecentPayments() {
  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo(() => createColumns(navigate), [navigate])

  const table = useReactTable({
    data: recentPayments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 pt-3">
        <CardTitle>Платежи</CardTitle>
        <CardDescription>
          Список платежей с детальной информацией
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col pb-3 pt-0">
        <div className="mb-3">
          <DataTableToolbar table={table} />
        </div>
        <div className="flex-1 overflow-hidden rounded-md border">
          <div className="h-full overflow-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/payments/${row.original.id}`)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      Нет результатов.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
          <div className="text-muted-foreground text-sm">
            Показано {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            из {table.getFilteredRowModel().rows.length} платежей
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium hidden sm:block">Строк на странице</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Назад
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Вперед
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

