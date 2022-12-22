import {BaseCommand} from '@adonisjs/ace'

export default class MakeUser extends BaseCommand {
  public static commandName = 'make:user'
  public static description = 'Create a new user'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run (): Promise<void> {
    const { default: User } = await import('Domains/Users/Models/User')

    const username = await this.prompt.ask('Enter user username')
    const email = await this.prompt.ask('Choose email')
    const password = await this.prompt.secure('Choose account password')
    const passwordConfirmation = await this.prompt.secure('Confirm account password')

    if (password !== passwordConfirmation) {
      this.logger.fatal('Passwords are not identical!')
      return
    }

    await User.create({
      username: username,
      email: email,
      password: password,
      isAdmin: true,
      hasEmailConfirmed: true
    })

    this.logger.success('User was create')
  }
}
