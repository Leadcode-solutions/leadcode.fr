import React, { } from 'react'
import Navigation from '../components/Navigation'
import DarkModeButton from '../components/darkModeButton'

type Props = {
  actions?
  title?: string
  children
}

export default ({ children }: Props) => {
  return (
    <div className="bg-theme min-h-screen flex flex-col">
      <div className="flex min-h-full relative w-full">
       <Navigation />
        <main className="bg-gray-50 bg-theme w-full">
          {children}
        </main>
        <DarkModeButton />
      </div>
    </div>
  )
}
