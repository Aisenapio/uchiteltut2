import { Header } from "@/components/layout/header"
import { Outlet } from 'react-router'

export default function TasksLayout() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex min-h-min flex-1 flex-col p-4">
        <Outlet />
      </main>
    </>
  )
}
