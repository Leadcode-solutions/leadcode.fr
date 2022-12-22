import React from "react"
import Input from "./form/Input"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

type Props = {
  filterText: any,
  onFilter: any,
  onClear: any
}

export default ({filterText, onFilter}: Props) => {
  return (
    <div className="flex items-center gap-4 text-gray-700 border rounded-md px-2 py-2 justify-between">
      <div >
        <MagnifyingGlassIcon className="h-3 w-3" />
      </div>

      <Input
        classNames={"text-sm"}
        key="search"
        name="search"
        type="text"
        value={filterText}
        callback={onFilter}
        text="Filter table data..."
      />

    </div>

  )
}
