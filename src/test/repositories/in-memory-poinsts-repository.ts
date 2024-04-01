import type { PointsRepository } from '@/domain/application/repositories/points-repository'
import type { Point } from '@/domain/enterprise/entities/point'

export class InMemoryPointsRepository implements PointsRepository {
  points: Point[] = []

  async findApproximatedPoints(coordsFromDistance: {
    fromTop: number
    fromBottom: number
    fromLeft: number
    fromRight: number
  }): Promise<Point[]> {
    return this.points.filter((point) => {
      const { x, y } = point.coord
      return (
        x >= coordsFromDistance.fromLeft &&
        x <= coordsFromDistance.fromRight &&
        y >= coordsFromDistance.fromBottom &&
        y <= coordsFromDistance.fromTop
      )
    })
  }

  async create(point: Point): Promise<void> {
    this.points.push(point)
  }

  async findAll(): Promise<Point[]> {
    return this.points
  }
}
