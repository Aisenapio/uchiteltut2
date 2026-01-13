import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { IconChecklist, IconEdit, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router"
import useDialogState from "@/hooks/use-dialog-state"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UsersActionDialog } from "./users-action-dialog"
import { UsersDeactivateDialog } from "./users-deactivate-dialog"

export function DataTableRowActions({ row }) {
  const [open, setOpen] = useDialogState(null)
  return (
    <>
      <DropdownMenu modal={false}>
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
          <DropdownMenuItem asChild>
            <Link to={`/users/${row.original.id}`}>
              Просмотреть детали
              <DropdownMenuShortcut>
                <IconChecklist size={16} />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen("edit")}>
            Редактировать
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen("deactivate")}
            className="text-red-500!"
          >
            Деактивировать
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UsersActionDialog
        key={`user-edit-${row.original.id}`}
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
        currentRow={row.original}
      />

      <UsersDeactivateDialog
        key={`user-deactivate-${row.original.id}`}
        open={open === "deactivate"}
        onOpenChange={() => setOpen("deactivate")}
        currentRow={row.original}
      />
    </>
  )
}
