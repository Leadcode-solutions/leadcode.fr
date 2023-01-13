import React from 'react'

type Props = {
	data: {
		icon: any,
		theme: string,
		direction: string[]
	}
}

export default ({ data }: Props) => {
	return (
		<div className={`float-item-wrap float-item-wrap--${data.theme}`}>
        <div className="float-item">
          <div className="float-item-inner">
            { data.icon && <data.icon className="w-! h-8 text-white"/>}
          </div>
        </div>
        <div className={`float-item-line float-item-line--${data.direction[0]}`}></div>
        <div className={`float-item-line float-item-line--${data.direction[1]}`}></div>
    </div>
	)
}