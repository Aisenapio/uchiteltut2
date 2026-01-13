import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

export function ProductsPrimaryActions() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button
        className="font-semibold"
        onClick={() => navigate("/products/new")}
      >
        Создать продукт
      </Button>
    </div>
  )
}

