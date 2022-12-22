import React, {useEffect, useState, Fragment} from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import User from 'Domains/Users/Models/User'
import Layout from '../../../layouts/layout'
import Data from "../../../components/Data";
import {TableColumn} from "react-data-table-component";
import {classNames} from "../../../helpers";


type Props = {
  users: User[]
}

const UserInfo = ({ row }: any) => (
  <div className="flex flex-col ">
    <span className="font-semibold text-gray-500 row-username">{row.username}</span>
    <span className="text-gray-600 row-email">{row.email}</span>
  </div>
)

const columns: TableColumn<any>[] = [
  {name: 'Username', id: 'username', selector: (row: any) => row.username, cell: row => <UserInfo row={row}/>},
]

type IProfil = {
  user: User,
  open: boolean,
  setOpen: any
}
const Profil = ({ user,open, setOpen }: IProfil) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-200 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto bg-theme-dark w-screen max-w-2xl right-0">
                  <div className="flex h-full flex-col bg-theme-dark  shadow-xl">
                    <div className=" py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">Profil</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1">
                      {/* Replace with your content */}
                      <div className="absolute inset-0">
                        <div className="pb-6">
                          <div className="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
                          <div className="lg:-mt-15 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
                            <div>
                              <div className="-m-1 flex">
                                <div className="inline-flex overflow-hidden rounded-lg border-2 border-black">
                                  { user.avatar
                                    ?   <img
                                      className="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                                      src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                      alt=""
                                    />
                                    : <div className="text-4xl h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48 bg-slate-100 text-slate-600 font-medium justify-center flex items-center align-center">
                                      <span className="sr-only">First username letter</span>
                                      <span className=" ">{ user.username[0] }</span>
                                    </div>
                                  }

                                </div>
                              </div>
                            </div>
                            <div className="mt-6 sm:ml-6 sm:flex sm:items-center sm:justify-between sm:w-full">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-bold text-gray-100 sm:text-2xl">{ user.username}</h3>
                                  <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                  <span className="sr-only">Online</span>
                                </span>
                                </div>
                                <p className="text-sm text-gray-500">{ user.email }</p>
                              </div>
                              <div className="flex">
                                <div className="ml-3 inline-flex sm:ml-0">
                                  <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                      <span className="sr-only">Open options menu</span>
                                      <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href={`users/edit/${user.id}`}
                                                className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                                )}
                                              >
                                                Edit profile
                                              </a>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


export default function ({ users }: Props) {
  const [data] = useState(users)
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  //const [profil, setProfil] = useState()

  const onClick = (row) => {
    setUser(row)
  }

  useEffect(() => {
    setOpen(!!user)
  }, [user])

  return (
    <Layout title="Liste des utilisateurs">
      <div className="container py-6 flex items-start">
        <div className="table--user--index w-full">
          <Data
            data={data}
            deleteHeader={true}
            onClick={onClick}
            column={columns}
          />
        </div>

        <div className="">
          {user && <Profil user={user} open={open} setOpen={setOpen} />}
        </div>
      </div>

    </Layout>
  )
}
