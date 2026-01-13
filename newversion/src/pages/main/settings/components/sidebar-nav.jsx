import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SidebarNav({ className, items, ...props }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const [val, setVal] = useState(pathname ?? "/settings")

  const handleSelect = (e) => {
    setVal(e)
    navigate(e)
  }

  return (
    <>
      <div className="p-1 md:hidden">
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className="h-10 sm:w-48">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex gap-x-4 px-2 py-0.5">
                  <span className="scale-125 [&_svg]:size-[1.125rem]">
                    {item.icon}
                  </span>
                  <span className="text-md">{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        orientation="horizontal"
        type="always"
        className="bg-background hidden w-full min-w-48 px-1 py-2 md:block"
      >
        <nav
          className={cn(
            "flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0",
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              <span className="mr-2 [&_svg]:size-[1.125rem]">{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </>
  )
}
