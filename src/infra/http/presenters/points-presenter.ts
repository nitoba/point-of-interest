import type { Point } from '@/domain/enterprise/entities/point'

export class PointsPresenter {
  static toHttp(point: Point) {
    return {
      id: point.id.toString(),
      name: point.name,
      xCoord: point.coord.x,
      yCoord: point.coord.y,
    }
  }
}
