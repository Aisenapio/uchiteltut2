import { Outlet } from 'react-router'
import { Providers } from "./providers"

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// })

export const metadata = {
  title: "Shadcnblocks - Admin Kit",
  description: "Shadcnblocks - Admin Kit built with NextJS",
}

export default function RootLayout() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}
