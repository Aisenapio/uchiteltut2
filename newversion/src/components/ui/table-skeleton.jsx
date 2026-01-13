import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TableSkeleton({ rows = 5, columns = 5, showToolbar = false, showPagination = false }) {
  return (
    <div className="space-y-4">
      {showToolbar && (
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-[150px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
          <Skeleton className="h-8 w-[100px]" />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: columns }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-8 w-[200px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      )}
    </div>
  )
}

export function TableCardSkeleton({ rows = 5, columns = 5, showToolbar = false, showPagination = false }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48" />
      </CardHeader>
      <CardContent>
        <TableSkeleton rows={rows} columns={columns} showToolbar={showToolbar} showPagination={showPagination} />
      </CardContent>
    </Card>
  )
}

