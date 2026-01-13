import { useState } from "react"
import { IconEye } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { TasksDetailDialog } from "./tasks-detail-dialog"

export function TaskDetailViewer({ currentRow }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        onClick={() => setOpen(true)}
      >
        <IconEye />
        <span className="sr-only">Open Task Detail</span>
      </Button>

      <TasksDetailDialog
        key="task-detail"
        open={open}
        onOpenChange={setOpen}
        currentRow={currentRow}
      />
    </>
  )
}
