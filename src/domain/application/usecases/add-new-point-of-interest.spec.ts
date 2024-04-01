import { InMemoryPointsRepository } from '@/test/repositories/in-memory-poinsts-repository'
import { AddNewPointOfInterestUseCase } from './add-new-point-of-interest'

describe('AddNewPointOfInterest', () => {
  let useCase: AddNewPointOfInterestUseCase
  let repository: InMemoryPointsRepository

  beforeEach(() => {
    repository = new InMemoryPointsRepository()
    useCase = new AddNewPointOfInterestUseCase(repository)
  })

  it('should create a new point', async () => {
    const result = await useCase.execute({
      name: 'Point of Interest 1',
      x: 1,
      y: 2,
    })
    expect(result.isRight()).toBe(true)

    expect(repository.points).toHaveLength(1)
  })

  it('should not be able create a new point with invalid coord', async () => {
    const result = await useCase.execute({
      name: 'Point of Interest 1',
      x: -1,
      y: 2,
    })
    expect(result.isLeft()).toBe(true)

    expect(repository.points).toHaveLength(0)
  })
})
