import type { PointsRepository } from '@/domain/application/repositories/points-repository'
import type { Point } from '@/domain/enterprise/entities/point'
import { db } from '../drizzle'
import { points } from '../point-schema'
import { DrizzlePointsMapper } from '../mappers/points-mapper'

export class DrizzlePointsRepository implements PointsRepository {
  async create(point: Point): Promise<void> {
    await db.insert(points).values({
      id: point.id.toString(),
      name: point.name,
      xCoord: point.coord.x,
      yCoord: point.coord.y,
    })
  }

  async findAll(): Promise<Point[]> {
    const points = await db.query.points.findMany()

    return points.map(DrizzlePointsMapper.toDomain)
  }

  async findApproximatedPoints(coordsFromDistance: {
    fromTop: number
    fromBottom: number
    fromLeft: number
    fromRight: number
  }): Promise<Point[]> {
    const points = await db.query.points.findMany({
      where: ({ xCoord, yCoord }, { and, gte, lte }) =>
        and(
          gte(xCoord, coordsFromDistance.fromLeft),
          lte(xCoord, coordsFromDistance.fromRight),
          gte(yCoord, coordsFromDistance.fromBottom),
          lte(yCoord, coordsFromDistance.fromTop),
        ),
    })

    return points.map(DrizzlePointsMapper.toDomain)
  }
}
