import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function TeamMembers() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Проблемные арендаторы</CardTitle>
        <CardDescription className="truncate">
          Арендаторы с неудачными платежами или просрочкой оплаты.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-1.png" alt="Image" />
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">ООО 'Спортмастер'</p>
              <p className="text-muted-foreground text-sm">Просрочка: 5 дней</p>
            </div>
          </div>
          <Button variant="outline" className="h-7 py-0" size="sm">
            Ошибка оплаты
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-5.png" alt="Image" />
              <AvatarFallback>СК</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">ООО 'Салон красоты'</p>
              <p className="text-muted-foreground text-sm">Просрочка: 3 дня</p>
            </div>
          </div>
          <Button variant="outline" className="h-7 py-0" size="sm">
            Ошибка оплаты
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-4.png" alt="Image" />
              <AvatarFallback>РП</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">ООО 'Ресторан Престиж'</p>
              <p className="text-muted-foreground text-sm">Ожидает оплаты</p>
            </div>
          </div>
          <Button variant="outline" className="h-7 py-0" size="sm">
            Ожидает
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-3.png" alt="Image" />
              <AvatarFallback>ИП</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">ИП Петров П.П.</p>
              <p className="text-muted-foreground text-sm">Ожидает оплаты</p>
            </div>
          </div>
          <Button variant="outline" className="h-7 py-0" size="sm">
            Ожидает
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
