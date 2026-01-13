import { useState } from "react"
import LogsTable from "./logs-table"
import LogsToolbar from "./logs-toolbar"

export default function LogsList({ toggleFilters }) {
  const [searchVal, setSearchVal] = useState("")

  return (
    <div>
      <LogsToolbar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        toggleFilters={toggleFilters}
      />
      <LogsTable searchVal={searchVal} />
    </div>
  )
}
