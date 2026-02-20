import { useState } from 'react'

interface IPaginationState {
  page: number
  size: number
}

interface IPaginationActions {
  setPage: (page: number) => void
  setSize: (size: number) => void
  reset: () => void
}

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

export const usePagination = (
  initialPage = DEFAULT_PAGE,
  initialSize = DEFAULT_SIZE
): IPaginationState & IPaginationActions => {
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  const handleSetPage = (newPage: number) => {
    setPage(newPage)
  }

  const handleSetSize = (newSize: number) => {
    setSize(newSize)
    setPage(DEFAULT_PAGE)
  }

  const reset = () => {
    setPage(initialPage)
    setSize(initialSize)
  }

  return {
    page,
    size,
    setPage: handleSetPage,
    setSize: handleSetSize,
    reset,
  }
}
