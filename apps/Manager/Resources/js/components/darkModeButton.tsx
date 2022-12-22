import React, { useEffect, useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MoonIcon } from '@heroicons/react/24/solid'
import { ComputerDesktopIcon, SunIcon } from '@heroicons/react/20/solid'
import { classNames } from '../helpers'

export default function () {
  const [theme, setTheme] = useState(localStorage.theme)

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const modes = {
    light: { label: 'Light', handle: () => toLight(), icon: <SunIcon width={24}/> },
    dark: { label: 'Dark', handle: () => toDark(), icon: <MoonIcon width={24}/> },
    default: { label: 'System', handle: () => toOsPreference(), icon: <ComputerDesktopIcon width={24}/> }
  }

  function getCurrentMode () {
    return modes[theme] || modes.default
  }

  function toDark () {
    localStorage.theme = 'dark'
    setTheme('dark')
  }

  function toLight () {
    localStorage.theme = 'light'
    setTheme('light')
  }

  function toOsPreference () {
    localStorage.removeItem('theme')
    setTheme(null)
  }

  return (
    <div className="fixed bottom-10 right-10">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-theme shadow-md bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-theme shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none">
          {getCurrentMode().icon}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute transform -translate-y-full -top-2 right-0 z-10 w-56 origin-top-right rounded-md bg-theme dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {...Object.values(modes).map((mode) => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={mode.handle}
                      className={classNames(
                        active ? 'bg-gray-100 bg-theme' : '',
                        'w-full flex items-center space-x-3 px-4 py-2 text-sm text-theme'
                      )}
                    >
                      <span>{mode.icon}</span>
                      <span>{mode.label}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
