import type { Point } from '@/domain/enterprise/entities/point'

type CoordsFromDistance = {
  fromTop: number
  fromBottom: number
  fromLeft: number
  fromRight: number
}

export interface PointsRepository {
  create(point: Point): Promise<void>
  findAll(): Promise<Point[]>
  findApproximatedPoints(
    coordsFromDistance: CoordsFromDistance,
  ): Promise<Point[]>
}
