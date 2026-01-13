import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useQuery, useApolloClient } from '@apollo/client/react'
import { GET_CURRENT_USER } from '@/graphql/authOperations'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"


export function NavUser({ user = {} }) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const client = useApolloClient()

  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-first'
  })

  const currentUser = data?.currentUser
  const displayUser = currentUser || user

  // Generate display name
  const displayName = displayUser?.firstName && displayUser?.lastName
    ? `${displayUser.firstName} ${displayUser.lastName}`
    : displayUser?.email || 'Пользователь'

  // Generate avatar initials
  const avatarInitials = displayUser?.firstName && displayUser?.lastName
    ? `${displayUser.firstName[0]}${displayUser.lastName[0]}`
    : displayUser?.email?.[0]?.toUpperCase() || 'U'

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token')
    // Clear Apollo cache
    client.resetStore()
    // Redirect to home page
    navigate('/')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={displayUser?.avatar} alt={displayName} />
                <AvatarFallback className="rounded-lg">{avatarInitials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs">{displayUser?.email || ''}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={displayUser?.avatar} alt={displayName} />
                  <AvatarFallback className="rounded-lg">{avatarInitials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs">{displayUser?.email || ''}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/settings/profile">
                  <BadgeCheck />
                  Профиль
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings/notifications">
                  <Bell />
                  Уведомления
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup> 
            <DropdownMenuSeparator />
            */}
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
