import React , { ChangeEventHandler } from "react"

type Props = {
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password',
  value: string,
  name: string,
  text: string
  key: string,
  classNames?: string
  callback?: ChangeEventHandler
  clear?: ChangeEventHandler
}

export default ({type, value, name, text, key, callback, classNames}: Props) => {
  return (
    <>
      <input
        className={classNames}
        key={key}
        name={name}
        id={name}
        type={type}
        placeholder={text}
        value={value}
        onChange={callback}
      />
    </>
  )
}
