import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/ui/sidebar"

import { Outlet } from 'react-router'

export default function DashboardLayout() {
  const defaultClose = false
  return (
    <div className="border-grid flex flex-1 flex-col">
      <SidebarProvider defaultOpen={!defaultClose}>

        <div
          id="content"
          className={cn(
            "flex h-full w-full flex-col",
            "has-[div[data-layout=fixed]]:h-svh",
            "group-data-[scroll-locked=1]/body:h-full",
            "has-[data-layout=fixed]:group-data-[scroll-locked=1]/body:h-svh",
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  )
}
