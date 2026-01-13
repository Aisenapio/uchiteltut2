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
        <CardTitle>Участники команды</CardTitle>
        <CardDescription className="truncate">
          Пригласите участников вашей команды для совместной работы.
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
              <p className="text-sm leading-none font-medium">Dale Komen</p>
              <p className="text-muted-foreground text-sm">dale@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 py-0" size="sm">
                Участник <ChevronDown className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Выберите новую роль..." />
                <CommandList>
                  <CommandEmpty>Роли не найдены.</CommandEmpty>
                  <CommandGroup className="p-1.5">
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Наблюдатель</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать и комментировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Разработчик</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и редактировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Биллинг</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и управлять биллингом.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Владелец</p>
                      <p className="text-muted-foreground text-sm">
                        Административный доступ ко всем ресурсам.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-5.png" alt="Image" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">Sofia Davis</p>
              <p className="text-muted-foreground text-sm">m@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 py-0" size="sm">
                Владелец <ChevronDown className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Выберите новую роль..." />
                <CommandList>
                  <CommandEmpty>Роли не найдены.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Наблюдатель</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать и комментировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Разработчик</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и редактировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Биллинг</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и управлять биллингом.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Владелец</p>
                      <p className="text-muted-foreground text-sm">
                        Административный доступ ко всем ресурсам.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-4.png" alt="Image" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">Jackson Lee</p>
              <p className="text-muted-foreground text-sm">p@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 py-0" size="sm">
                Участник <ChevronDown className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Выберите новую роль..." />
                <CommandList>
                  <CommandEmpty>Роли не найдены.</CommandEmpty>
                  <CommandGroup className="p-1.5">
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Наблюдатель</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать и комментировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Разработчик</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и редактировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Биллинг</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и управлять биллингом.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Владелец</p>
                      <p className="text-muted-foreground text-sm">
                        Административный доступ ко всем ресурсам.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-3.png" alt="Image" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">
                Isabella Nguyen
              </p>
              <p className="text-muted-foreground text-sm">i@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 py-0" size="sm">
                Участник <ChevronDown className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Выберите новую роль..." />
                <CommandList>
                  <CommandEmpty>Роли не найдены.</CommandEmpty>
                  <CommandGroup className="p-1.5">
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Наблюдатель</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать и комментировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Разработчик</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и редактировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Биллинг</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и управлять биллингом.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Владелец</p>
                      <p className="text-muted-foreground text-sm">
                        Административный доступ ко всем ресурсам.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-2.png" alt="Image" />
              <AvatarFallback>HR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">Hugan Romex</p>
              <p className="text-muted-foreground text-sm">kai@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 py-0" size="sm">
                Участник <ChevronDown className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Выберите новую роль..." />
                <CommandList>
                  <CommandEmpty>Роли не найдены.</CommandEmpty>
                  <CommandGroup className="p-1.5">
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Наблюдатель</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать и комментировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Разработчик</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и редактировать.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Биллинг</p>
                      <p className="text-muted-foreground text-sm">
                        Может просматривать, комментировать и управлять биллингом.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Владелец</p>
                      <p className="text-muted-foreground text-sm">
                        Административный доступ ко всем ресурсам.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}
