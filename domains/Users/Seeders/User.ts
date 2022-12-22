import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {UserFactory} from "Domains/Users/Factories/UserFactory";

export default class extends BaseSeeder {
  public async run () {
    await UserFactory.createMany(50)
  }
}
