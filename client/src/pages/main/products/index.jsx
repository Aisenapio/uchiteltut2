import { useState, useEffect } from "react"
import { columns } from "./components/products-columns"
import { ProductsPrimaryActions } from "./components/products-primary-actions"
import { ProductsTable } from "./components/products-table"
import { ProductsStats } from "./components/products-stats"
import { productListSchema } from "./data/schema"
import { products } from "./data/products"
import { Header } from "@/components/layout/header"
import { StatsCardSkeleton } from "@/components/ui/stats-card-skeleton"
import { TableSkeleton } from "@/components/ui/table-skeleton"

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [productList, setProductList] = useState([])

  useEffect(() => {
    // Симулируем загрузку данных
    const loadData = async () => {
      setIsLoading(true)
      // Небольшая задержка для демонстрации skeleton
      await new Promise(resolve => setTimeout(resolve, 500))
      const parsed = productListSchema.parse(products)
      setProductList(parsed)
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      <Header />

      <div className="space-y-4 p-4">
        <div className="mb-2 flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold tracking-tight">Продукты</h1>
          <ProductsPrimaryActions />
        </div>
        {isLoading ? (
          <>
            <div className="mb-6 grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <StatsCardSkeleton />
              </div>
            </div>
            <div className="flex-1">
              <TableSkeleton rows={10} columns={7} showToolbar={true} showPagination={true} />
            </div>
          </>
        ) : (
          <>
            <ProductsStats />
            <div className="flex-1">
              <ProductsTable data={productList} columns={columns} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

