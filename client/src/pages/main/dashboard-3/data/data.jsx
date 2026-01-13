import {
  IconBrandSpeedtest,
  IconClipboardData,
  IconEye,
  IconFileBarcode,
} from "@tabler/icons-react"

export const dashboard3Stats = [
  {
    label: "Сессии",
    icon: <IconClipboardData size={18} className="text-blue-500" />,
    stats: 6132,
    percentage: 90,
    type: "up",
  },
  {
    label: "Просмотры страниц",
    icon: <IconEye size={18} className="text-indigo-500" />,
    stats: 11236,
    percentage: 40,
    type: "down",
  },
  {
    label: "Среднее",
    icon: <IconFileBarcode size={18} className="text-orange-500" />,
    stats: 46,
    percentage: 22,
    type: "up",
  },
  {
    label: "Показатель отказов",
    icon: <IconBrandSpeedtest size={18} className="text-red-500" />,
    stats: 6132,
    percentage: 30,
    type: "down",
  },
]

