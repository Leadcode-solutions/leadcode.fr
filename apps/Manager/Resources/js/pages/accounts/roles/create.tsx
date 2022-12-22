import React from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Form, Input, SelectMany, SubmitButton } from '../../../components/form'
import Layout from '../../../layouts/layout'
import { classNames } from '../../../helpers'

type Props = {
  permissions: Permissions[]
}


export default function Create ({ permissions }: Props) {
  const { data, setData, processing, errors, post } = useForm({
    label: '',
    permissions: []
  })

  async function handleSubmit (event) {
    event.preventDefault()
    post('/manager/roles')
  }

  function Actions () {
    return (
      <Link
        href="/manager/roles"
        className={classNames(
          'inline-flex items-center rounded-md border border-transparent',
          'bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm',
          'hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
        )}
      >
        Revenir à la liste
      </Link>
    )
  }

  return (
    <Layout title="Créer un compte utilisateur" actions={Actions}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:max-w-5xl">
        <div className="p-5 rounded-md border border-gray-200 bg-white py-20">
          <Form submit={handleSubmit} classes="md:grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <Input label="Nom du role" name="label" value={data.label} errors={errors} onChange={setData} />
            </div>
            <div className="md:col-span-2">
              <SelectMany label="Permissions" name="permissions" values={data.permissions} options={permissions} onChange={setData} />
            </div>

            <div className="col-span-3">
              <SubmitButton label="Créer le role" disabled={processing} />
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  )
}
