import { test } from '@japa/runner'
import { UserFactory } from 'Domains/Users/Factories/UserFactory'
import Database from '@ioc:Adonis/Lucid/Database'
import { RoleFactory } from 'Domains/Users/Factories/RoleFactory'
import { faker } from '@faker-js/faker'
import User from 'Domains/Users/Models/User'

const payload = {
  username: faker.name.fullName(),
  is_admin: faker.datatype.boolean(),
  email: faker.internet.email(),
  password: faker.internet.password(10)
}

async function createPersistantUser (): Promise<User> {
  return User.create({
    username: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(10)
  })
}

export async function mockUser(...permissions: number[]): Promise<User> {
  const role = await RoleFactory.create()
  await role.related('permissions').attach(permissions)

  const user = await UserFactory.create()
  await Promise.all([
    user.merge({ isAdmin: false, isLocked: false }).save(),
    user.related('roles').attach([role.id])
  ])

  return user
}

test.group('can use users resources', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test("can't display user list when not authenticate", async ({ client, route }) => {
    const response = await client.get(route('manager.users.index'))
    response.assertStatus(403)
  })

  test("can't display user list if haven't permission", async ({ client, route }) => {
    const user = await UserFactory.create()
    await user.merge({ isAdmin: false, isLocked: false }).save()

    const response = await client.get(route('manager.users.index')).loginAs(user)
    response.assertStatus(403)
  })

  test('can display user list if admin', async ({ client, route }) => {
    const user = await UserFactory.create()
    await user.merge({ isAdmin: true, isLocked: false }).save()

    const response = await client.get(route('manager.users.index')).loginAs(user)
    response.assertStatus(200)
  })

  test('can display user list if user has create, update or destroy permission', async ({ client, route }) => {
    const role = await RoleFactory.create()
    await role.related('permissions').sync([1])

    const user = await UserFactory.create()
    await Promise.all([
      user.merge({ isAdmin: false, isLocked: false }).save(),
      user.related('roles').attach([role.id])
    ])

    const responseWithStore = await client.get(route('manager.users.index')).loginAs(user)
    responseWithStore.assertStatus(200)

    await role.related('permissions').sync([2])
    const responseWithUpdate = await client.get(route('manager.users.index')).loginAs(user)
    responseWithUpdate.assertStatus(200)

    await role.related('permissions').sync([3])
    const responseWithDestroy = await client.get(route('manager.users.index')).loginAs(user)
    responseWithDestroy.assertStatus(200)
  })

  test('can display user create page', async ({ client, route }) => {
    const role = await RoleFactory.create()
    await role.related('permissions').attach([1])

    const user = await UserFactory.create()
    await Promise.all([
      user.merge({ isAdmin: false, isLocked: false }).save(),
      user.related('roles').attach([role.id])
    ])

    const response = await client.get(route('manager.users.index')).loginAs(user)
    response.assertStatus(200)
  })

  test("can't display user create page if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()

    const response = await client.get(route('manager.users.create')).loginAs(user)
    response.assertStatus(403)
  })

  test("can create user if has permission", async ({ client, route }) => {
    const user = await mockUser(1)
    const response = await client.post(route('manager.users.store'))
      .fields(payload)
      .loginAs(user)

    response.assertStatus(200)
  })

  test("can't create user if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const response = await client.post(route('manager.users.store'))
      .fields(payload)
      .loginAs(user)

    response.assertStatus(403)
  })

  test('can display user update page', async ({ client, route }) => {
    const user = await mockUser(2)
    const persistantUser = await createPersistantUser()

    const response = await client.get(route('manager.users.edit', [persistantUser.id])).loginAs(user)
    response.assertStatus(200)
  })

  test("can't display user create page if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const persistantUser = await createPersistantUser()

    const response = await client.get(route('manager.users.edit', [persistantUser.id])).loginAs(user)
    response.assertStatus(403)
  })

  test('can update user', async ({ client, route }) => {
    const user = await mockUser(2)
    const persistantUser = await createPersistantUser()

    const response = await client.put(route('manager.users.update', [persistantUser.id]))
      .fields({ ...payload, username: faker.name.fullName() })
      .loginAs(user)

    response.assertStatus(200)
  })

  test("can't update user if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const persistantUser = await createPersistantUser()

    const response = await client.put(route('manager.users.update', [persistantUser.id]))
      .fields({ ...payload, username: faker.name.fullName() })
      .loginAs(user)

    response.assertStatus(403)
  })

  test('can delete user', async ({ client, route }) => {
    const user = await mockUser(3)
    const persistantUser = await createPersistantUser()

    const response = await client.delete(route('manager.users.destroy', [persistantUser.id])).loginAs(user)
    response.assertStatus(200)
  })

  test("can't delete user if hasn't permission", async ({ client, route }) => {
    const user = await mockUser()
    const persistantUser = await createPersistantUser()

    const response = await client.delete(route('manager.users.destroy', [persistantUser.id])).loginAs(user)
    response.assertStatus(403)
  })
})
