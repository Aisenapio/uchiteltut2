import { createContext, useContext } from "react"
import { CommandMenu } from "./command-menu"

const SearchContext = createContext(null)

export default function SearchProvider({ children, value }) {
  return (
    <SearchContext.Provider value={value}>
      {children}
      <CommandMenu />
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw new Error("useSearch has to be used within <SearchContext.Provider>")
  }

  return searchContext
}
