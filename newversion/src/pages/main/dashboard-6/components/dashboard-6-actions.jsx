import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { IconCalendar } from "@tabler/icons-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Dashboard6Actions() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select defaultValue="month">
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Период" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Неделя</SelectItem>
          <SelectItem value="month">Месяц</SelectItem>
          <SelectItem value="quarter">Квартал</SelectItem>
          <SelectItem value="year">Год</SelectItem>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
            <IconCalendar className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: ru }) : <span>Выберите дату</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
      <Button>Экспорт отчета</Button>
    </div>
  )
}

