import React from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Form } from '../../../components/form'
import Layout from '../../../layouts/layout'
import { classNames } from '../../../helpers'
import Role from 'Domains/Users/Models/Role'
import User from 'Domains/Users/Models/User'

type Props = {
  user: User
  roles: Role[]
}


export default function Edit ({ user }: Props) {
  const { put  } = useForm({
    username: user.username,
    email: user.email,
    roles: user.roles.map((role) => role.id)
  })

  async function handleSubmit (event) {
    event.preventDefault()
    put('/manager/accounts/users/' + user.id)
  }

  /*async function handleDestroy (event) {
    event.preventDefault()
    destroy('/manager/accounts/users/' + user.id)
  }*/

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
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-100">Account</h1>
        <Form submit={handleSubmit}>
          <div className="flex flex-col gap-8 mt-4">
            <div className="mt-">
              <div className="">
                <h2 className="text-xl font-medium text-gray-100">Profile</h2>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-start">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-blue-gray-900">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-800 text-gray-300 bg-gray-900 shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-blue-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-800 text-gray-300 bg-gray-900 shadow-sm sm:text-sm"
                    />
                  </div>
                </div>
              </div>


            </div>

            <div>

            </div>
          </div>
        </Form>



        {/*<div className="p-5 rounded-md border border-gray-200 bg-white py-20">
          <Form submit={handleSubmit} classes="md:grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-5">
              <Input label="Nom de l'utilisateur" name="username" value={data.username} required={true} errors={errors} onChange={setData} />
              <Input label="Email" type='email' name="email" value={data.email} required={true} errors={errors} onChange={setData} />
              <div className="md:col-span-1">
                <SelectMany label="Roles" name="roles" values={data.roles} options={roles} onChange={setData} />
              </div>
            </div>

            <div className="col-span-3 space-x-5">
              <SubmitButton label="Mettre à jour l'utilisateur" disabled={processing} />
              <DeleteButton label="Supprimer l'utilisateur" submit={handleDestroy}>
                <p className="text-sm text-gray-500">
                  La suppression de l'utilisateur <span className="font-bold">{user.username}</span> est irreversible et permanante.
                  Êtes-vous sûr de vouloir le supprimer ?
                </p>
              </DeleteButton>
            </div>
          </Form>
        </div>*/}
      </div>
    </Layout>
  )
}
