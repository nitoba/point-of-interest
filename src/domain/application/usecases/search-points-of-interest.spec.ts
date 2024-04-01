import { InMemoryPointsRepository } from '@/test/repositories/in-memory-poinsts-repository'
import { SearchPointsOfInterestUseCase } from './search-points-of-interest'
import { makePoint } from '@/test/factories/make-point'
import { Coord } from '@/domain/enterprise/value-objects/coord'

describe('SearchPointsOfInterest', () => {
  let useCase: SearchPointsOfInterestUseCase
  let repository: InMemoryPointsRepository

  beforeEach(() => {
    repository = new InMemoryPointsRepository()
    useCase = new SearchPointsOfInterestUseCase(repository)

    const points = [
      makePoint({
        name: 'Lanchonete',
        coord: Coord.with({ x: 27, y: 12 }).value as Coord,
      }),
      makePoint({
        name: 'Posto',
        coord: Coord.with({ x: 31, y: 18 }).value as Coord,
      }),
      makePoint({
        name: 'Joalheria',
        coord: Coord.with({ x: 15, y: 12 }).value as Coord,
      }),
      makePoint({
        name: 'Floricultura',
        coord: Coord.with({ x: 19, y: 21 }).value as Coord,
      }),
      makePoint({
        name: 'Pub',
        coord: Coord.with({ x: 12, y: 8 }).value as Coord,
      }),
      makePoint({
        name: 'Supermercado',
        coord: Coord.with({ x: 23, y: 6 }).value as Coord,
      }),
      makePoint({
        name: 'Churrascaria',
        coord: Coord.with({ x: 28, y: 2 }).value as Coord,
      }),
    ]

    repository.points.push(...points)
  })

  it('should return a list of points of interest based on the distance and ref points', async () => {
    const result = await useCase.execute({
      maxDistance: 10,
      refX: 20,
      refY: 10,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.points).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Lanchonete',
          }),
          expect.objectContaining({
            name: 'Joalheria',
          }),
          expect.objectContaining({
            name: 'Pub',
          }),
          expect.objectContaining({
            name: 'Supermercado',
          }),
        ]),
      )
    }
  })

  it('should not be able return points if exists invalid arguments', async () => {
    let result = await useCase.execute({
      maxDistance: -10,
      refX: 20,
      refY: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new Error('Invalid distance'))

    result = await useCase.execute({
      maxDistance: 10,
      refX: -20,
      refY: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new Error('Invalid coord'))

    result = await useCase.execute({
      maxDistance: 10,
      refX: 20,
      refY: -10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new Error('Invalid coord'))
  })
})
