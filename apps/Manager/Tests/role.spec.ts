import { test } from '@japa/runner'
import { UserFactory } from 'Domains/Users/Factories/UserFactory'
import Database from '@ioc:Adonis/Lucid/Database'
import { RoleFactory } from 'Domains/Users/Factories/RoleFactory'
import { faker } from '@faker-js/faker'
import Role from 'Domains/Users/Models/Role'
import { mockUser } from 'App/Manager/Tests/user.spec'

const payload = {
  label: faker.lorem.words(3),
  power: faker.datatype.number({ min: 0, max: 100 })
}

async function createPersistantRole (): Promise<Role> {
  return Role.create({
    label: faker.lorem.words(3),
    power: faker.datatype.number({ min: 0, max: 100 })
  })
}

test.group('can use roles resources', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test("can't display role list when not authenticate", async ({ client, route }) => {
    const response = await client.get(route('manager.roles.index'))
    response.assertStatus(403)
  })

  test("can't display role list if haven't permission", async ({ client, route }) => {
    const user = await UserFactory.create()
    await user.merge({ isAdmin: false, isLocked: false }).save()

    const response = await client.get(route('manager.roles.index')).loginAs(user)
    response.assertStatus(403)
  })

  test('can display role list if admin', async ({ client, route }) => {
    const user = await UserFactory.create()
    await user.merge({ isAdmin: true, isLocked: false }).save()

    const response = await client.get(route('manager.roles.index')).loginAs(user)
    response.assertStatus(200)
  })

  test('can display role list if user has create, update or destroy permission', async ({ client, route }) => {
    const role = await RoleFactory.create()
    await role.related('permissions').sync([4])

    const user = await UserFactory.create()
    await Promise.all([
      user.merge({ isAdmin: false, isLocked: false }).save(),
      user.related('roles').attach([role.id])
    ])

    const responseWithStore = await client.get(route('manager.roles.index')).loginAs(user)
    responseWithStore.assertStatus(200)

    await role.related('permissions').sync([5])
    const responseWithUpdate = await client.get(route('manager.roles.index')).loginAs(user)
    responseWithUpdate.assertStatus(200)

    await role.related('permissions').sync([6])
    const responseWithDestroy = await client.get(route('manager.roles.index')).loginAs(user)
    responseWithDestroy.assertStatus(200)
  })

  test('can display role create page', async ({ client, route }) => {
    const role = await RoleFactory.create()
    await role.related('permissions').attach([4])

    const user = await UserFactory.create()
    await Promise.all([
      user.merge({ isAdmin: false, isLocked: false }).save(),
      user.related('roles').attach([role.id])
    ])

    const response = await client.get(route('manager.roles.index')).loginAs(user)
    response.assertStatus(200)
  })

  test("can't display role create page if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()

    const response = await client.get(route('manager.roles.create')).loginAs(user)
    response.assertStatus(403)
  })

  test("can create role if has permission", async ({ client, route }) => {
    const user = await mockUser(4)
    const response = await client.post(route('manager.roles.store'))
      .fields(payload)
      .loginAs(user)

    response.assertStatus(200)
  })

  test("can't create role if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const response = await client.post(route('manager.roles.store'))
      .fields(payload)
      .loginAs(user)

    response.assertStatus(403)
  })

  test('can display role update page', async ({ client, route }) => {
    const user = await mockUser(2)
    const persistantRole = await createPersistantRole()

    const response = await client.get(route('manager.roles.edit', [persistantRole.id])).loginAs(user)
    response.assertStatus(200)
  })

  test("can't display role create page if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const persistantRole = await createPersistantRole()

    const response = await client.get(route('manager.roles.edit', [persistantRole.id])).loginAs(user)
    response.assertStatus(403)
  })

  test('can update role', async ({ client, route }) => {
    const user = await mockUser(2)
    const persistantRole = await createPersistantRole()

    const response = await client.put(route('manager.roles.update', [persistantRole.id]))
      .fields({ ...payload, username: faker.name.fullName() })
      .loginAs(user)

    response.assertStatus(200)
  })

  test("can't update role if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const persistantRole = await createPersistantRole()

    const response = await client.put(route('manager.roles.update', [persistantRole.id]))
      .fields({ ...payload, username: faker.name.fullName() })
      .loginAs(user)

    response.assertStatus(403)
  })

  test('can delete role', async ({ client, route }) => {
    const user = await mockUser(3)
    const persistantRole = await createPersistantRole()

    const response = await client.delete(route('manager.roles.destroy', [persistantRole.id])).loginAs(user)
    response.assertStatus(200)
  })

  test("can't delete role if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const persistantRole = await createPersistantRole()

    const response = await client.delete(route('manager.roles.destroy', [persistantRole.id])).loginAs(user)
    response.assertStatus(403)
  })
})
