import { IconFileDescription, IconFilter } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export default function DashboardActions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <IconFilter /> Фильтр
      </Button>
      <Button variant="default">
        <IconFileDescription />
        Экспорт
      </Button>
    </div>
  )
}
