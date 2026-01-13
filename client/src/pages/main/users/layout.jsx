import { Header } from "@/components/layout/header"
import { Outlet } from 'react-router'

export default function UsersLayout() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex h-full flex-1 flex-col p-4">
        <Outlet />
      </main>
    </>
  )
}
