import React from "react"

export const Right = ({page}) => {
    return (
        <a href={`?page=${page}`} className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-200 bg-gray-100 text-sm font-medium text-gray-500 hover:bg-gray-200">
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </a>
    )
}

export const Left = ({page}) => {
    return (
        <a href={`?page=${page}`} className=" inline-flex items-center px-2 py-2 rounded-l-md border border-gray-200 bg-gray-100 text-sm font-medium text-gray-500 hover:bg-gray-200">
					<span className="sr-only">Previous</span>

					<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
        </a>
    )
}