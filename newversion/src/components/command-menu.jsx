import { useCallback, useState, useMemo } from "react"
import {
  IconArrowRightDashed,
  IconDeviceLaptop,
  IconMoon,
  IconSun,
  IconUser,
  IconPackage,
} from "@tabler/icons-react"
import { useNavigate } from "react-router"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { sidebarData } from "./layout/data/sidebar-data"
import { useSearch } from "./search-provider"
import { ScrollArea } from "./ui/scroll-area"
import { getSubscribers } from "@/pages/main/subscribers/data/subscribers"
import { products } from "@/pages/main/products/data/products"

export function CommandMenu() {
  const navigate = useNavigate()
  const [_, setTheme] = useState('light')
  const { open, setOpen } = useSearch()
  const runCommand = useCallback(
    (command) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  // Получаем данные подписчиков и продуктов
  const subscribers = useMemo(() => getSubscribers(), [])
  const allProducts = useMemo(() => products, [])

  // Функция для получения названия подписчика
  const getSubscriberName = (subscriber) => {
    if (subscriber.type === "legal") {
      return subscriber.companyName || ""
    } else {
      const { firstName, lastName, middleName } = subscriber
      return [lastName, firstName, middleName].filter(Boolean).join(" ") || ""
    }
  }

  // Функция для получения поискового значения подписчика (включает все возможные варианты названия)
  const getSubscriberSearchValue = (subscriber) => {
    const name = getSubscriberName(subscriber)
    if (subscriber.type === "legal") {
      return `${name} ${subscriber.companyName || ""} ${subscriber.inn || ""}`.toLowerCase()
    } else {
      const { firstName, lastName, middleName, email } = subscriber
      return `${name} ${firstName || ""} ${lastName || ""} ${middleName || ""} ${email || ""}`.toLowerCase()
    }
  }

  return (
    <CommandDialog 
      modal 
      open={open} 
      onOpenChange={setOpen}
    >
      <CommandInput placeholder="Поиск по страницам, подписчикам и продуктам..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pr-1">
          <CommandEmpty>Результаты не найдены.</CommandEmpty>

          {/* Все подписчики - будут отфильтрованы автоматически cmdk */}
          <CommandGroup heading="Подписчики">
            {subscribers.map((subscriber) => {
              const name = getSubscriberName(subscriber)
              const searchValue = getSubscriberSearchValue(subscriber)
              return (
                <CommandItem
                  key={subscriber.id}
                  value={searchValue}
                  keywords={[name.toLowerCase(), subscriber.email?.toLowerCase() || ""].filter(Boolean)}
                  onSelect={() => {
                    runCommand(() => navigate(`/subscribers/${subscriber.id}`))
                  }}
                >
                  <IconUser className="mr-2 h-4 w-4" />
                  <span>{name}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>

          <CommandSeparator />

          {/* Все продукты - будут отфильтрованы автоматически cmdk */}
          <CommandGroup heading="Продукты">
            {allProducts.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name.toLowerCase()}
                keywords={[product.name.toLowerCase(), product.description?.toLowerCase() || ""].filter(Boolean)}
                onSelect={() => {
                  runCommand(() => navigate(`/products/${product.id}`))
                }}
              >
                <IconPackage className="mr-2 h-4 w-4" />
                <span>{product.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Навигация */}
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate(navItem.url))
                      }}
                    >
                      <div className="mr-2 flex h-4 w-4 items-center justify-center">
                        <IconArrowRightDashed className="text-muted-foreground/80 size-2" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  )

                return navItem.items?.map((subItem, i) => (
                  <CommandItem
                    key={`${subItem.url}-${i}`}
                    value={subItem.title}
                    onSelect={() => {
                      runCommand(() => navigate(subItem.url))
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <IconArrowRightDashed className="text-muted-foreground/80 size-2" />
                    </div>
                    {subItem.title}
                  </CommandItem>
                ))
              })}
            </CommandGroup>
          ))}

          <CommandSeparator />
          <CommandGroup heading="Тема">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <IconSun /> <span>Светлая</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <IconMoon className="scale-90" />
              <span>Темная</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <IconDeviceLaptop />
              <span>Системная</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
