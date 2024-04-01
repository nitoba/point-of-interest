import { Point } from '@/domain/enterprise/entities/point'
import { Coord } from '@/domain/enterprise/value-objects/coord'
import type { InferSelectModel } from 'drizzle-orm'
import type { points } from '../point-schema'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class DrizzlePointsMapper {
  static toDomain(raw: InferSelectModel<typeof points>): Point {
    return Point.create(
      {
        name: raw.name,
        coord: Coord.with({ x: raw.xCoord, y: raw.yCoord }).value as Coord,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
