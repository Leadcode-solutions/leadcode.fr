import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Unpoly from 'Services/Unpoly'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
    const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
    const Server = this.app.container.resolveBinding('Adonis/Core/Server')

    HttpContext.getter('up', function () {
      return new Unpoly(this)
    },true)

    Server.hooks.before(async (ctx) => {
      ctx.view.share({ up: ctx.up })
    })

    Server.hooks.after(async (ctx) => {
      ctx.up.commit()
    })
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
