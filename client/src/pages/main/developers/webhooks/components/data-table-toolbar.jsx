import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
      <Input
        placeholder="Filter URL endpoint..."
        value={(table.getColumn("url")?.getFilterValue()) ?? ""}
        onChange={(event) =>
          table.getColumn("url")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[250px]"
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
