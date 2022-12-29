import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DefaultController {
  public async home ({ view }: HttpContextContract) {
    const tabs = [
      {id: '01', name: 'Global tax compliance', body: 'Lorem ipsum'},
      {id: '02', name: 'New features', body: 'dzaidjzaijdoiazjdoiaz'},
      {id: '03', name: 'Add new engineering', body: 'DJ j kDJdhzaodh a'}
    ]
    return view.render('public::index', { tabs })
  }

  public async ui ({ view }: HttpContextContract) {
    return view.render('public::pages/ui')
  }
}
