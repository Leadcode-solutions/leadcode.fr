import React, { useEffect } from 'react'
import FloatBox from './FloatBox'
import { CubeTransparentIcon, CpuChipIcon, BoltIcon, CloudIcon} from '@heroicons/react/24/outline'

const data = [
	{
			icon: CubeTransparentIcon,
			theme: 'none',
			direction: ['top', 'bottom']
	},
	{
			icon: CpuChipIcon,
			theme: 'green',
			direction: ['left', 'right']
	},
	{
			icon: BoltIcon,
			theme: 'orange',
			direction: ['top', 'bottom']
	},
	{
			icon: CloudIcon,
			theme: 'red',
			direction: ['left', 'right']
	}
]

export default () => {
	useEffect(() => {
		const elements = document.querySelectorAll(".float-item-wrap")

        
		async function animateToggle (item: Element) {
			const value = Math.floor(Math.random() * (4-2) + 2)

			await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(null)
				}, 2000*value)
			})

			const interval = setInterval(() => {
				item.classList.toggle("animate")
				clearInterval(interval)
				animateToggle(item)
			}, 1000)
		}

		elements.forEach(async (item) => {
			await animateToggle(item)
		})
	})
	return (
		<div className="home-hero-float-wrap hidden md:flex">
			<div className="float-item-col">
					<FloatBox data={data[0]}/>
					<FloatBox data={data[1]}/>
			</div>
			<div className="float-item-col">
					<FloatBox data={data[2]}/>
					<FloatBox data={data[3]}/>
			</div>
		</div>
	)
}