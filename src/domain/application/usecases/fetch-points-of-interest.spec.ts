import { InMemoryPointsRepository } from '@/test/repositories/in-memory-poinsts-repository'
import { FetchPointsOfInterestUseCase } from './fetch-points-of-interest'
import { makePoint } from '@/test/factories/make-point'

describe('FetchPointsOfInterest', () => {
  let useCase: FetchPointsOfInterestUseCase
  let repository: InMemoryPointsRepository

  beforeEach(() => {
    repository = new InMemoryPointsRepository()
    useCase = new FetchPointsOfInterestUseCase(repository)
  })

  it('should create a new point', async () => {
    for (let i = 0; i < 4; i++) {
      await repository.create(
        makePoint({
          name: `Point of Interest ${i}`,
        }),
      )
    }
    const result = await useCase.execute()

    expect(result.points).toHaveLength(4)
  })
})
