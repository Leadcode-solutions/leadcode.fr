import React from 'react'
import { getNumberOfPages } from 'react-data-table-component/dist/src/DataTable/util'

export default ({ count, page, rowsPerPage, onChangePage }) => {
  const handleFirstPageButtonClick = () => {
    onChangePage(1)
  }

  const handleBackButtonClick = () => onChangePage(page)

  const handleNextButtonClick = () => {
    onChangePage(page + 2)
  }

  const handleLastPageButtonClick = () => {
    onChangePage(getNumberOfPages(count, rowsPerPage))
  }

  return (
    <>
      <button onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label={"first page"}>
        First Page
      </button>
      <button onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        Back
      </button>
      <button
        onClick={handleNextButtonClick}
        disabled={page >= getNumberOfPages(count, rowsPerPage) - 1}
        aria-label="next page"
      >
        NExt
      </button>
      <button
        onClick={handleLastPageButtonClick}
        disabled={page >= getNumberOfPages(count, rowsPerPage) - 1}
        aria-label="last page"
      >
        Last Page
      </button>
    </>
  )
}
