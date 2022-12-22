import React from 'react'
import Role from 'Domains/Users/Models/Role'

type Props = { role: Role }

export default function Tag ({ role }: Props) {
  return (
    <div className='px-2 py-1 rounded-sm bg-gray-100'>{role.label}</div>
  )
}
