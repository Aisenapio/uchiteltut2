import {
  IconApps,
  IconChecklist,
  IconCode,
  IconCoin,
  IconLayoutDashboard,
  IconNotification,
  IconPackage,
  IconSettings,
  IconTool,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { AudioWaveform, GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export const sidebarData = {
  user: {
    name: "тест",
    email: "test@mail.ru",
    avatar: "/avatars/ausrobdev-avatar.png",
  },
  teams: [
    {
      name: "Shadcnblocks - Admin Kit",
      logo: ({ className }) => (
        <Logo className={className} />
      ),
      plan: "Nextjs + shadcn/ui",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "Основное",
      items: [
        {
          title: "Dashboard 1",
          url: "/",
          icon: IconLayoutDashboard,
        },
        {
          title: "Dashboard 2",
          url: "/dashboard-2",
          icon: IconLayoutDashboard,
        },
        {
          title: "Dashboard 3",
          url: "/dashboard-3",
          icon: IconLayoutDashboard,
        },
        {
          title: "Dashboard 5",
          url: "/dashboard-5",
          icon: IconLayoutDashboard,
        },
        {
          title: "Dashboard 6",
          url: "/dashboard-6",
          icon: IconLayoutDashboard,
        },
        {
          title: "Подписчики",
          url: "/subscribers",
          icon: IconUsers,
        },
        {
          title: "Продукты",
          url: "/products",
          icon: IconPackage,
        },
        {
          title: "Компоненты",
          url: "/components",
          icon: IconApps,
        },
      ],
    },
    {
      title: "Прочее",
      items: [
        {
          title: "Настройки",
          icon: IconSettings,
          items: [
            {
              title: "Общие",
              icon: IconTool,
              url: "/settings",
            },
            {
              title: "Профиль",
              icon: IconUser,
              url: "/settings/profile",
            },
            {
              title: "Оплата",
              icon: IconCoin,
              url: "/settings/billing",
            },
            {
              title: "Планы",
              icon: IconChecklist,
              url: "/settings/plans",
            },
            {
              title: "Подключенные приложения",
              icon: IconApps,
              url: "/settings/connected-apps",
            },
            {
              title: "Уведомления",
              icon: IconNotification,
              url: "/settings/notifications",
            },
          ],
        },
        {
          title: "Разработчикам",
          icon: IconCode,
          items: [
            {
              title: "Обзор",
              url: "/developers/overview",
            },
            {
              title: "API ключи",
              url: "/developers/api-keys",
            },
            {
              title: "Webhooks",
              url: "/developers/webhooks",
            },
            {
              title: "События/Логи",
              url: "/developers/events-&-logs",
            },
          ],
        },
      ],
    },
  ],
};
