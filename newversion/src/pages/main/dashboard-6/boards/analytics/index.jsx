import Stats from "../overview/components/stats"
import TotalRevenue from "../overview/components/total-revenue"
import RevenueChart from "../overview/components/revenue-chart"
import PaymentChart from "../overview/components/payment-chart"

export default function Analytics() {
  return (
    <div className="grid auto-rows-auto grid-cols-3 gap-5 md:grid-cols-6 lg:grid-cols-9">
      <div className="col-span-3 lg:col-span-2 xl:col-span-2">
        <TotalRevenue />
      </div>
      <Stats />
      <div className="col-span-3">
        <RevenueChart />
      </div>
      <div className="col-span-3">
        <PaymentChart />
      </div>
    </div>
  )
}

