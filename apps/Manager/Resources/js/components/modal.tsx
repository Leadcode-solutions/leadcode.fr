import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { classNames } from '../helpers'

function Modal ({ title, state, backgroundColor, hoverBackgroundColor, focusRingColor, textColor, accentBackgroundColor, cancel, submit, submitButtonText, cancelButtonText, children }) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => cancel(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className={classNames(backgroundColor, 'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10')}>
                    <ExclamationTriangleIcon className={classNames(textColor, 'h-6 w-6')} aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      {children}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:ml-10 sm:flex sm:pl-4">
                  {submitButtonText && (
                    <button
                      type="button"
                      className={classNames(
                        accentBackgroundColor,
                        hoverBackgroundColor,
                        backgroundColor,
                        focusRingColor,
                        'inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm'
                      )}
                      onClick={(event) => submit(event)}
                    >
                      {submitButtonText}
                    </button>
                  )}
                  {cancelButtonText && (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => cancel(false)}
                      ref={cancelButtonRef}
                    >
                      {cancelButtonText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

type Props = {
  title: string,
  state: boolean
  cancel: Function
  submit: Function
  children: JSX.Element
}

export function ModalDanger ({ title, state, cancel, submit, children }: Props) {
  return <Modal
    backgroundColor="bg-red-100"
    accentBackgroundColor="bg-red-600"
    hoverBackgroundColor="hover:bg-red-700"
    textColor="text-red-600"
    focusRingColor="focus:ring-red-500"
    cancel={cancel}
    state={state}
    title={title}
    children={children}
    submit={submit}
    submitButtonText="Je suis sûr"
    cancelButtonText="Revenir en lieu sûr"
  />
}
