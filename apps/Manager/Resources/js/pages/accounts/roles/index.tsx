import React, { useState } from 'react'
import Role from 'Domains/Users/Models/Role'
import Layout from '../../../layouts/layout'
import { classNames } from '../../../helpers'
import { Link } from '@inertiajs/inertia-react'
import Data from '../../../components/Data'
import { TableColumn } from 'react-data-table-component'

type Props = {
  roles: Role[]
}

function Actions () {
  return (
    <Link
      href="/manager/roles/create"
      className={classNames(
        'inline-flex items-center rounded-md border border-transparent',
        'bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm',
        'hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
      )}
    >
      Créer un role
    </Link>
  )
}


export default function ({ roles }: Props) {
  const [data] = useState(roles)

  const columns: TableColumn<any>[] = [
    { name: 'Label', id: 'username', selector: (row: any) => row.label },
  ]

  return (
    <Layout title="Liste des roles" actions={Actions}>
      <div className="container">
        <div className="mt-8 flex flex-col">
          <div className="table--user--index p-12 w-full">
            <Data
              data={data}
              deleteHeader={true}
              column={columns}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
