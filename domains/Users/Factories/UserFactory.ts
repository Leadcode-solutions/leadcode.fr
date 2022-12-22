import Factory  from '@ioc:Adonis/Lucid/Factory'
import User from 'Domains/Users/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    username: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(10),
    isAdmin: faker.datatype.boolean(),
    hasEmailConfirmed: faker.datatype.boolean(),
    isLocked: faker.datatype.boolean(),
  }
}).build()
