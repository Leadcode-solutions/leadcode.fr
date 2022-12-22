import React from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Form, Input, SelectMany, SubmitButton, Toggle } from '../../../components/form'
import Layout from '../../../layouts/layout'
import { classNames } from '../../../helpers'
import Role from 'Domains/Users/Models/Role'

type Props = { roles: Role[] }

export default function Create ({ roles }: Props) {
  const { data, setData, processing, errors, post } = useForm({
    username: '',
    email: '',
    password: '',
    roles: [],
    randomPassword: false
  })

  async function handleSubmit (event) {
    event.preventDefault()
    post('/manager/users')
  }

  function Actions () {
    return (
      <Link
        href="/manager/users"
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

  function generateRandomPassword () {
    const uuid = window.crypto.randomUUID()
    setData('password', uuid.split('-').join(''))
  }

  return (
    <Layout title="Créer un compte utilisateur" actions={Actions}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:max-w-5xl">
        <div className="p-5 rounded-md border border-gray-200 bg-white py-20">
          <Form submit={handleSubmit} classes="md:grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-5">
              <Input label="Nom de l'utilisateur" name="username" value={data.username} required={true} errors={errors} onChange={setData} />
              <Input label="Email" type='email' name="email" value={data.email} required={true} errors={errors} onChange={setData} />
              <div className="space-y-5">
                <Input label="Mot de passe" name="password" value={data.password} required={true} errors={errors} onChange={setData} />
                <div className="flex justify-between">
                  <Toggle label="Mot de passe aléatoire" name="randomPassword" value={data.randomPassword} onChange={setData} />
                  {data.randomPassword && (
                    <button type='button' onClick={generateRandomPassword} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">Générer</button>
                  )}
                </div>
              </div>
              <div className="md:col-span-1">
                <SelectMany label="Roles" name="roles" values={data.roles} options={roles} onChange={setData} />
              </div>
            </div>

            <div className="col-span-3">
              <SubmitButton label="Créer l'utilisateur" disabled={processing} />
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  )
}
