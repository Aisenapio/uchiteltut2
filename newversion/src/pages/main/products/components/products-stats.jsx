import { IconInfoCircle, IconPackage } from "@tabler/icons-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { products } from "../data/products"

export function ProductsStats() {
  const totalProducts = products.length
  const legalProducts = products.filter(p => p.status === "legal").length

  return (
    <div className="mb-6 grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <ProductStat
          title="Всего продуктов"
          icon={IconPackage}
          stat={totalProducts}
          statDesc={`${legalProducts} для юридических лиц`}
          desc="Общее количество продуктов в системе"
        />
      </div>
    </div>
  )
}

const ProductStat = (props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-2">
        <CardTitle className="flex items-center gap-2">
          <props.icon size={16} />
          {props.title}
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <IconInfoCircle className="text-muted-foreground scale-90 stroke-[1.25]" />
              <span className="sr-only">More Info</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{props.desc}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-4xl font-bold">{props.stat}</div>
        <p className="text-muted-foreground text-xs">{props.statDesc}</p>
      </CardContent>
    </Card>
  )
}

