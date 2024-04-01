import { Coord } from '@/domain/enterprise/value-objects/coord'
import type { PointsRepository } from '../repositories/points-repository'
import { Point } from '@/domain/enterprise/entities/point'
import { left, type Either, right } from '@/core/either'

type AddNewPointOfInterestRequest = {
  name: string
  x: number
  y: number
}

export type AddNewPointOfInterestResponse = Either<Error, void>

export class AddNewPointOfInterestUseCase {
  constructor(private readonly pointsRepository: PointsRepository) {}

  async execute({
    name,
    x,
    y,
  }: AddNewPointOfInterestRequest): Promise<AddNewPointOfInterestResponse> {
    const coord = Coord.with({ x, y })

    if (coord.isLeft()) {
      return left(coord.value)
    }

    const point = Point.create({ name, coord: coord.value })
    await this.pointsRepository.create(point)

    return right(undefined)
  }
}
