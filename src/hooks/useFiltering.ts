import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { IQueryFilter } from "../api/types/filter"
import useDebounce from "./useDebounce"

const useFiltering = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<IQueryFilter>({})
  const debounceFilter = useDebounce((key: keyof IQueryFilter, value?) => {
    setFilter(current => {
      const filterCopy = { ...current }
      if (value === undefined) {
        delete filterCopy[key]
        searchParams.delete(key)
        setSearchParams(searchParams)
      } else {
        filterCopy[key] = value
        setSearchParams({ [key]: value })
      }

      return filterCopy
    })
  })

  const updateFilter = (event: any) => {
    let value = event.target.value.length > 0 ? event.target.value : undefined
    debounceFilter(event.target.id, value)
  }

  const pageChanged = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilter({
      page: value
    })
  }

  useEffect(() => {
    const queryParams: { [key: string]: string | number } = {}
    searchParams.forEach((val, key) => {
      queryParams[key] = val
    })

    setFilter({
      ...queryParams
    })
  }, [])

  return { filter, updateFilter, pageChanged }
}

export default useFiltering