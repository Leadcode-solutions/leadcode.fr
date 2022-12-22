import React from 'react'
import { classNames } from '../helpers'

type Props = {
  children: any,
  type?: 'button' | 'submit',
  mode: 'primary' | 'secondary' | 'success' | 'danger'
  href?: string
  attr?: string
}

export default function Button ({ children, type, mode, attr, href }: Props) {
  return href
    ? <a href={href} className={classNames('btn', 'btn-' + mode)} {...attr || ''}>{children}</a>
    : <button type={type} className={classNames('btn', 'btn-' + mode)} {...attr || ''}>{children}</button>
}
