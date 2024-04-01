import type { Point } from '@/domain/enterprise/entities/point'
import type { PointsRepository } from '../repositories/points-repository'
import { Coord } from '@/domain/enterprise/value-objects/coord'
import { left, type Either, right } from '@/core/either'

export type SearchPointsOfInterestRequest = {
  refX: number
  refY: number
  maxDistance: number
}

export type SearchPointsOfInterestResponse = Either<
  Error,
  {
    points: Point[]
  }
>

export class SearchPointsOfInterestUseCase {
  constructor(private readonly pointsRepository: PointsRepository) {}

  async execute({
    maxDistance,
    refX,
    refY,
  }: SearchPointsOfInterestRequest): Promise<SearchPointsOfInterestResponse> {
    const coord = Coord.with({ x: refX, y: refY })

    if (coord.isLeft()) {
      return left(coord.value)
    }

    if (maxDistance < 0) {
      return left(new Error('Invalid distance'))
    }

    const fromTop = refY + maxDistance
    let fromBottom = refY - maxDistance
    let fromLeft = refX - maxDistance
    const fromRight = refX + maxDistance

    if (fromBottom < 0) fromBottom = 0
    if (fromLeft < 0) fromLeft = 0

    const coordsFromDistance = {
      fromTop,
      fromBottom,
      fromLeft,
      fromRight,
    }

    const approximatedPoints =
      await this.pointsRepository.findApproximatedPoints(coordsFromDistance)

    const points = approximatedPoints.filter((point) => {
      const { x, y } = point.coord
      //   dAB² = (xB – xA)² + (yB – yA)²
      // find the compriment of the line between the two points
      const distance = Math.sqrt(Math.pow(refX - x, 2) + Math.pow(refY - y, 2))
      return distance <= maxDistance
    })

    return right({
      points,
    })
  }
}
