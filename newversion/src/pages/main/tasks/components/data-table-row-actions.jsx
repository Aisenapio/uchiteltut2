import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Edit2 } from "lucide-react"
import useDialogState from "@/hooks/use-dialog-state"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { labels } from "../data/data"
import { taskSchema } from "../data/schema"
import { TasksDetailDialog } from "./tasks-detail-dialog"
import { TasksMutateDrawer } from "./tasks-mutate-drawer"


export function DataTableRowActions({ row }) {
  const task = taskSchema.parse(row.original)

  const [open, setOpen] = useDialogState(null)

  return (
    <>
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" onClick={() => setOpen("edit")}>
          <Edit2 />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => setOpen("detail")}>
              Просмотреть детали
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen("edit")}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem>Создать копию</DropdownMenuItem>
            <DropdownMenuItem>В избранное</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Метки</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={task.label}>
                  {labels.map((label) => (
                    <DropdownMenuRadioItem
                      key={label.value}
                      value={label.value}
                    >
                      {label.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Удалить
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TasksMutateDrawer
        key="task-update"
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
        currentRow={task}
      />

      <TasksDetailDialog
        key="task-detail"
        open={open === "detail"}
        onOpenChange={() => setOpen("detail")}
        currentRow={task}
      />
    </>
  )
}
