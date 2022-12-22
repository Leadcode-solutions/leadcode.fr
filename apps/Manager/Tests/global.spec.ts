import { test } from '@japa/runner'
import { UserFactory } from 'Domains/Users/Factories/UserFactory'
import Database from '@ioc:Adonis/Lucid/Database'
import { RoleFactory } from 'Domains/Users/Factories/RoleFactory'

test.group('can use the dashboard', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test("can't display dashboard when not authenticate", async ({ client, route }) => {
    const response = await client.get(route('manager.home'))
    response.assertStatus(403)
  })

  test("can't display dashboard if account is locked", async ({ client, route }) => {
    const user = await UserFactory.create()
    await user.merge({ isAdmin: false, isLocked: true }).save()

    const response = await client.get(route('manager.home')).loginAs(user)
    response.assertStatus(403)
  })

  test("can't display dashboard if haven't permission", async ({ client, route }) => {
    const user = await UserFactory.create()
    await user.merge({ isAdmin: false, isLocked: false }).save()

    const response = await client.get(route('manager.home')).loginAs(user)
    response.assertStatus(403)
  })

  test('can display dashboard if admin', async ({ client, route }) => {
    const user = await UserFactory.create()
    await user.merge({ isAdmin: true, isLocked: false }).save()

    const response = await client.get(route('manager.home')).loginAs(user)
    response.assertStatus(200)
  })

  test("can't display dashboard if has not permission and isn't admin", async ({ client, route }) => {
    const role = await RoleFactory.create()

    const user = await UserFactory.create()
    await Promise.all([
      user.merge({ isAdmin: false, isLocked: false }).save(),
      user.related('roles').attach([role.id]),
    ])

    const response = await client.get(route('manager.home')).loginAs(user)
    response.assertStatus(403)
  })

  test('can display dashboard if has one permission', async ({ client, route }) => {
    const role = await RoleFactory.create()
    await role.related('permissions').attach([1])

    const user = await UserFactory.create()
    await Promise.all([
      user.merge({ isAdmin: false, isLocked: false }).save(),
      user.related('roles').attach([role.id]),
    ])

    const response = await client.get(route('manager.home')).loginAs(user)
    response.assertStatus(200)
  })
})
