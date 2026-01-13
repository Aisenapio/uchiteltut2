import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { NavGroup } from "@/components/layout/nav-group"
import { NavUser } from "@/components/layout/nav-user"
import { TeamSwitcher } from "@/components/layout/team-switcher"
import { Outlet } from 'react-router'
import {
    Briefcase,
    Users,
    Settings,
    School
} from "lucide-react"

// School Navigation Data
const schoolSidebarData = {
    user: {
        name: "МБОУ СОШ №2",
        email: "school2@yakutsk.ru",
        avatar: "/avatars/school-logo-placeholder.jpg",
    },
    teams: [
        {
            name: "Кабинет школы",
            logo: (props) => <School {...props} />,
            plan: "Учитель тут",
        },
    ],
    navGroups: [
        {
            title: "Основное",
            items: [
                {
                    title: "Мои вакансии",
                    url: "/dashboard/school",
                    icon: Briefcase,
                },
                {
                    title: "Найти учителей",
                    url: "/dashboard/school/teachers",
                    icon: Users,
                },
            ],
        },
        {
            title: "Настройки",
            items: [
                {
                    title: "Профиль школы",
                    url: "/dashboard/school/profile",
                    icon: Settings,
                },
            ],
        },
    ],
}

export function SchoolSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={schoolSidebarData.teams} />
            </SidebarHeader>
            <SidebarContent>
                {schoolSidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={schoolSidebarData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default function SchoolDashboardLayout() {
    return (
        <SidebarProvider>
            <SchoolSidebar />
            <main className="flex-1 overflow-auto bg-slate-50">
                <div className="p-4 border-b flex items-center gap-4 bg-white sticky top-0 z-10">
                    <SidebarTrigger />
                    <h1 className="font-semibold text-lg">Кабинет школы</h1>
                </div>
                <div className="p-4 md:p-8 max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
