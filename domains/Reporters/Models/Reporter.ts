import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'Domains/Users/Models/User'

export type ReporterType = 'store' | 'update' | 'destroy'

export default class Reporter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: ReporterType

  @column()
  public userId: string

  @column()
  public label: string

  @column({
    consume: (value: string) => JSON.parse(value)
  })
  public body?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
