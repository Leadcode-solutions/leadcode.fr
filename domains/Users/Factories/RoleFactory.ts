import Factory  from '@ioc:Adonis/Lucid/Factory'
import Role from 'Domains/Users/Models/Role'

export const RoleFactory = Factory.define(Role, ({ faker }) => {
  return {
    label: faker.lorem.words(4),
    power: faker.datatype.number({ min: 0, max: 100 })
  }
}).build()
