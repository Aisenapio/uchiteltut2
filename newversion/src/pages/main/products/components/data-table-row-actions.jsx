import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Edit2 } from "lucide-react"
import { useNavigate } from "react-router"
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
import { productSchema } from "../data/schema"
import { ProductsMutateDrawer } from "./products-mutate-drawer"

export function DataTableRowActions({ row }) {
  const product = productSchema.parse(row.original)
  const navigate = useNavigate()
  const [open, setOpen] = useDialogState(null)

  return (
    <>
      <div
        className="flex items-center gap-1"
        data-prevent-row-click
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen("edit")}
        >
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
            <DropdownMenuItem
              onClick={() => navigate(`/products/${product.id}`)}
            >
              Просмотреть детали
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen("edit")}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem>Создать копию</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Удалить
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ProductsMutateDrawer
        key="product-update"
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
        currentRow={product}
      />
    </>
  )
}

