import React, { useEffect, useState } from "react"
import { Left, Right } from "./arrow";

export default ({ metaData }) => {
    const [data] = useState(metaData)
    useEffect(() => {
        console.log(data);
        
    })
    return (
        <div className="flex flex-row justify-between items-center px-8 py-2 overflow-hidden border-t border-gray-200">
            <div>
            <p className="text-gray-500">
							Page
							<span className="text-gray-300 underline">{ data.current_page }</span> sur 
							<span className="text-gray-300 underline">{ data.last_page }</span> pour 
							<span className="text-gray-300 underline">{ data.total }</span> résultat</p>
            </div>
            <div className="flex flex-row text-gray-500">
							{ data.current_page != 1 && <Left page={data.current_page-1} /> }
							<div>
									<span className="border-gray-200  bg-gray-100 hover:bg-gray-200 inline-flex items-center px-4 py-2 border text-sm font-medium"
									>
											{ data.current_page }
									</span>
							</div>
							{ data.current_page != data.last_page && <Right page={data.current_page+1}/>}

            </div>
            
        </div>
    )
}