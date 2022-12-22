import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LightningController {
	public async index ({ inertia }: HttpContextContract) {
    return inertia.render('lightning/create')
	}
}
