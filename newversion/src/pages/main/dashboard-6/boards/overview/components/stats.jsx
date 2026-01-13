import { allStats } from "../data/data"
import StatsCard from "./stats-card"
import React from "react"

export default function Stats() {
  // Отображаем только карточки начиная с индекса 2 (Ожидающие и Неудачные платежи)
  const remainingStats = allStats.slice(2)
  
  return (
    <>
      {remainingStats.map((stats) => (
        <StatsCard key={stats.label} className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3" {...stats} />
      ))}
    </>
  )
}

