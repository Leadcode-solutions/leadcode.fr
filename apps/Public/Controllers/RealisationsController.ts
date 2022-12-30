import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Realisation from 'Domains/Realisations/Models/Realisation'

export default class RealisationsController {
  public async home ({ view }: HttpContextContract) {
    const realisations = await Realisation.query()

    return view.render('public::pages/realisations/home', {
      realisations: realisations
    })
  }
}
