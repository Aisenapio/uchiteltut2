import { Header } from "@/components/layout/header"
import Overview from "./boards/overview"
import Dashboard6Actions from "./components/dashboard-6-actions"

export default function Dashboard6Page() {
  return (
    <>
      <Header />

      <div className="space-y-4 p-4">
        <div className="mb-2 flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Статистика по доходам и платежам</h1>
            <p className="text-muted-foreground text-sm">
              Детальная аналитика доходов, платежей и финансовых показателей
            </p>
          </div>
          <Dashboard6Actions />
        </div>
        <Overview />
      </div>
    </>
  )
}

