import React, {useMemo, useState} from "react"
import DataTable from 'react-data-table-component'
import SearchBar from "./SearchBar"

type Props = {
  data: any[],
  column: any,
  onClick?: any,
  sorted?: number
  deleteHeader: boolean
}


export default ({column, data, onClick, sorted, deleteHeader}: Props) => {
  const [value, setValue] = useState('')
  const filteredItems = data.filter(item => JSON.stringify(item)
    .toLowerCase()
    .indexOf(value.toLowerCase()) !== -1
  )

  const subHeaderComponent = useMemo(() => {
    const handClear = () => {
      if (value) setValue('')
    }

    return (
      <SearchBar
        onFilter={(e: any) => setValue(e.target.value)}
        onClear={handClear}
        filterText={value}
      />
    )
  }, [value])
  console.log(subHeaderComponent)

  return (
    <>
      <DataTable
        className="data"
        columns={column}
        data={filteredItems}
        pagination
        defaultSortFieldId={sorted}
        highlightOnHover
        pointerOnHover
        //subHeader
        noTableHead={deleteHeader}
        onRowClicked={onClick}
        // subHeaderComponent={subHeaderComponent}
      />
    </>
  )
}
