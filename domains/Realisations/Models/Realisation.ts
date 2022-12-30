import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { DateTime } from 'luxon'
import { attachment, AttachmentContract } from "@ioc:Adonis/Addons/AttachmentLite";

export default class Realisation extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public label: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['label'],
    allowUpdates: true
  })
  public slug: string

  @column()
  public description: string

  @column()
  public url: string

  @column()
  public advice: { username: string, value: string} | null

  @attachment({ preComputeUrl: true })
  public thumbnail: AttachmentContract

  @column()
  public isVisible: boolean

  @column()
  public isPin: boolean

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime | null) => {
      return value ? value.toFormat('yyyy-L-mm') : value
    }})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Realisation) {
    model.id = randomUUID()
  }
}
