import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ItemType } from '../types'
import { classNames } from '../helpers'

type Props = {
  navigation: ItemType[]
}

const Item = (params: {item: ItemType, classes?: string}) => {
  const { component } = usePage()
  return (
    <>
      <Link
        key={params.item.name}
        href={params.item.href}
        className={classNames(
          'relative px-8 py-4 flex text-md text-theme rounded-sm flex items-center gap-4',
          component.startsWith(params.item.component)
            ? 'left-border-active text-theme-active font-semibold !text-theme relative gap-4'
            : ''
        )}
      >
        {params.item.icon && <params.item.icon className="w-7" />}
      </Link>
    </>
  )
}

export const Sidenav = ({ navigation }: Props) => {
  return (
    <div className="hidden lg:sticky lg:top-0 lg:left-0 lg:flex w-24 h-screen border-r border-theme lg:relative">
      <div className="flex flex-col justify-between overflow-hidden relative py-4">
        <div className="flex flex-col h-full relative">
          <div className="mx-auto">
            <div className="flex items-center gap-4">
              <Link href="/">
                <div className="flex h-12 flex-shrink-0 items-center bg-theme-active relative w-12 rounded-md">
                  <img
                    className="h-7 w-auto mx-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full mt-12">
            <div className="flex flex-1 flex-col">
              <nav className="flex-1">
                <div className="flex flex-col">
                  {navigation.map((item) => <Item item={item} key={item.name} />)}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="p-4 relative">
          <div className="relative duration-200 ease-in-out text-gray-600 hover:text-white">
            <Cog6ToothIcon className="w-7 mx-auto"/>
          </div>
        </div>
      </div>
    </div>
  )
}
