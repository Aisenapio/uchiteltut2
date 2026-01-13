import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export function TeamSwitcher({ teams }) {
  const [isPressed, setIsPressed] = React.useState(false)

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    window.location.href = '/'
  }

  return (
    <SidebarMenu className="gap-0">
      <SidebarMenuItem className="p-0">
        <SidebarMenuButton
          size="lg"
          onClick={handleClick}
          className="!bg-transparent hover:!bg-accent/50 data-[state=open]:!bg-transparent !px-4 !py-2 !h-16 !w-full !gap-3 !rounded-xl !items-center group-data-[collapsible=icon]:!h-16 group-data-[collapsible=icon]:!size-auto group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-2 transition-all duration-200 active:scale-95"
        >
          <div
            className="flex-shrink-0 transition-transform duration-150"
            style={{ transform: isPressed ? 'scale(0.9)' : 'scale(1)' }}
          >
            <div className="!h-10 !w-10 !max-h-10 !max-w-10 rounded-lg overflow-hidden border-2 border-sidebar-border">
              {teams[0].logo({ className: "!h-full !w-full object-contain" })}
            </div>
          </div>
          <span className="font-bold text-lg text-sidebar-foreground whitespace-nowrap group-data-[collapsible=icon]:hidden">
            {teams[0].name}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
