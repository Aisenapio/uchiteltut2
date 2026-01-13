import { Link, Navigate, useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { userListSchema } from "../data/schema"
import { getUsers } from "../data/users"
import { UserDetailForm } from "./components/user-detail-form"


export default function UserDetailPage() {
  const { id } = useParams()

  const users = getUsers()
  const userList = userListSchema.parse(users)
  const user = userList.find((user) => user.id === id)

  if (!user) {
    return <Navigate to="/users" replace />
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/users">Users</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4 space-y-1">
        <div className="flex flex-wrap gap-2">
          <h1 className="text-lg font-bold">
            User Details: {`${user.firstName} ${user.lastName}`}
          </h1>
          <Badge variant="outline" className="text-muted-foreground">
            {user.id}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Comprehensive user information, including details, role, status, and
          management options.
        </p>
      </div>

      <div className="mt-4">
        <UserDetailForm user={user} />
      </div>
    </div>
  )
}
