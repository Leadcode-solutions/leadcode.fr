import React, { Fragment, useState } from 'react'
import { Switch, Listbox } from '@headlessui/react'
import { classNames } from '../helpers'
import { CheckIcon } from '@heroicons/react/24/outline'
import { ModalDanger } from '../components/modal'

export function Form ({ children, classes = '', submit }) {
  return (
    <form onSubmit={submit} className={classes || 'space-y-3'}>
      {children}
    </form>
  )
}

type InputProps = {
  label: string
  type?: 'text' | 'number' | 'date' | 'email'
  name: string
  value: string | number
  required?: boolean
  errors
  classes?: string
  onChange: Function
}

export function Input ({ label, type = 'text', name, value, errors, classes, required, onChange }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="flex items-center justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        {required && <span className="text-xs opacity-75">(requis)</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        {...required && 'required'}
        className={classNames(
          classes as String,
          'mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
        )}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  )
}

export function Textarea ({ label, name, value, errors, onChange, autoGrow = false, max }) {
  const [rows, setRows] = useState(5)

  function handleKeyDown() {
    const rows = value.split('\n').length
    if (rows >= 5) {
      setRows(rows)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        {max && <p>{value.length}/{max}</p>}
      </div>
      <textarea
        name={name}
        id={name}
        onKeyDown={autoGrow ? handleKeyDown : () => {}}
        defaultValue={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="block w-full rounded-md py-2 px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm min-y-[10rem]"
        rows={rows}
      ></textarea>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  )
}

export function SubmitButton ({ label, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{ minWidth: label.length * 0.5 + 'rem' }}
      className={
        classNames(
          disabled ? 'bg-gray-500 cursor-not-allowed': 'bg-sky-700 hover:bg-sky-800 focus:ring-sky-500',
          'inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
        )
      }
    >
      {!disabled
        ? label
        : (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )
      }
    </button>
  )
}

export function Toggle ({ label, name, value, onChange }) {
  return (
    <div className="flex items-center space-x-3 font-medium text-sm text-gray-700">
      <Switch
        checked={Boolean(value)}
        onChange={(value) => onChange(name, value)}
        className={`${
          Boolean(value) ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            Boolean(value) ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <p>{label}</p>
    </div>
  )
}

type SelectProps = {
  label: string,
  name: string,
  options: any[],
  value?: string | number | null,
  onChange: Function
}

export function Select ({ label, name, options, value = null, onChange }: SelectProps) {
  const current = options.find((option) => option.id == value);
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Listbox value={value} onChange={(val: any) => onChange(name, val.id)}>
        <Listbox.Button className="flex justify-start block w-full rounded-md py-2 px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          {current ? current.name : 'Rien de sélectionné'}
        </Listbox.Button>
        <Listbox.Options>
          <div className="mt-2 border border-gray-300 rounded-md overflow-hidden shadow-sm cursor-pointer">
            {options.map((option) => (
              <Listbox.Option key={option.id} value={option} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={classNames(
                      active ? 'bg-gray-100' : 'bg-white',
                      'px-3 py-1 sm:text-sm'
                    )}
                  >
                    {selected && <CheckIcon />}
                    {option.name}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </div>
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

type SelectManyProps = {
  label: string,
  name: string,
  options: any[],
  values: any[],
  onChange: Function
}

export function SelectMany ({ label, name, options, values, onChange }: SelectManyProps) {
  if (typeof values.at(0) !== 'number') {
    values = values.map((value) => value.id)
  }

  const currents = options.filter((option) => values.includes(option.id));
  console.log(currents)

  function Tag ({ label, classes, onClick }: { label: string, classes: string, onClick?: () => Function}) {
    return <span className={classNames(classes, 'flex items-center border py-0.5')} onClick={onClick}>{label}</span>
  }

  function removeSelectedOption (key: number | string) {
    const vals = values.filter((value) => value !== key)
    return onChange(name, vals)
  }

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Listbox value={values} onChange={(val: any) => onChange(name, val)} multiple>
        <Listbox.Button className="flex flex-wrap gap-2 justify-start block w-full rounded-md py-2 px-3 border border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm">
          {currents.length
            ? currents.map((current) => <Tag label={current.label} key={current.id} classes="px-2 border-gray-300 bg-gray-100 rounded-md" onClick={() => removeSelectedOption(current.id)} />)
            : <Tag label="Aucune sélection" classes="border-transparent" />
          }
        </Listbox.Button>
        <Listbox.Options>
          <div className="absolute origin-bottom-left w-full shadow mt-1 border border-gray-300 rounded-md overflow-hidden shadow-sm cursor-pointer">
            {options.map((option) => (
              <Listbox.Option key={option.id} value={option.id} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={classNames(
                      active ? 'bg-gray-100' : 'bg-white',
                      'flex justify-between px-3 py-2 sm:text-sm'
                    )}
                  >
                    {option.label}
                    {selected && <CheckIcon className="text-green-600 w-4" />}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </div>
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

type DeleteButtonProps = {
  label: string
  submit: Function
  children: JSX.Element
}
export function DeleteButton ({ label, submit, children }: DeleteButtonProps) {
  const [modal, setModal] = useState(false)

  return (
    <Fragment>
      <button
        type="button"
        onClick={() => setModal(true)}
        style={{ minWidth: label.length * 0.5 + 'rem' }}
        className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-700 hover:bg-red-800 focus:ring-red-500"
      >
        {label}
      </button>

      <ModalDanger title="Attention !" state={modal} cancel={setModal} submit={submit}>
        {children}
      </ModalDanger>
    </Fragment>
  )
}
