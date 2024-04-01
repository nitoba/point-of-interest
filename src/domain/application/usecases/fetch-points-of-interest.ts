import type { Point } from '@/domain/enterprise/entities/point'
import type { PointsRepository } from '../repositories/points-repository'

export type FetchPointsOfInterestResponse = {
  points: Point[]
}

export class FetchPointsOfInterestUseCase {
  constructor(private readonly pointsRepository: PointsRepository) {}

  async execute(): Promise<FetchPointsOfInterestResponse> {
    return {
      points: await this.pointsRepository.findAll(),
    }
  }
}
