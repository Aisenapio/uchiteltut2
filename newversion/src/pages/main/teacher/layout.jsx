import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { NavGroup } from "@/components/layout/nav-group"
import { NavUser } from "@/components/layout/nav-user"
import { TeamSwitcher } from "@/components/layout/team-switcher"
import { Outlet } from 'react-router'
import {
    Briefcase,
    GraduationCap,
    FileText,
    Search,
    User,
    Settings,
    LogOut
} from "lucide-react"

// Teacher Navigation Data
const teacherSidebarData = {
    user: {
        name: "Иван Иванов",
        email: "ivanov@example.com",
        avatar: "/avatars/teacher.jpg",
    },
    teams: [
        {
            name: "Кабинет учителя",
            logo: (props) => <GraduationCap {...props} />,
            plan: "Учитель тут",
        },
    ],
    navGroups: [
        {
            title: "Основное",
            items: [
                {
                    title: "Мое резюме",
                    url: "/dashboard/teacher/profile",
                    icon: User,
                },
                {
                    title: "Поиск вакансий",
                    url: "/dashboard/teacher/search",
                    icon: Search,
                },
                {
                    title: "Мои отклики",
                    url: "/dashboard/teacher/responses",
                    icon: FileText,
                },
            ],
        },
        {
            title: "Настройки",
            items: [
                {
                    title: "Настройки аккаунта",
                    url: "/dashboard/teacher/settings",
                    icon: Settings,
                },
            ],
        },
    ],
}

export function TeacherSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={teacherSidebarData.teams} />
            </SidebarHeader>
            <SidebarContent>
                {teacherSidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={teacherSidebarData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default function TeacherDashboardLayout() {
    return (
        <SidebarProvider>
            <TeacherSidebar />
            <main className="flex-1 overflow-auto bg-slate-50">
                <div className="p-4 border-b flex items-center gap-4 bg-white sticky top-0 z-10">
                    <SidebarTrigger />
                    <h1 className="font-semibold text-lg">Кабинет учителя</h1>
                </div>
                <div className="p-4 md:p-8 max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
