import { Coord } from './coord'

describe('Coord', () => {
  it('should create a valid Coord', () => {
    const coord = Coord.with({ x: 1, y: 2 })

    expect(coord.isRight()).toBe(true)

    if (coord.isRight()) {
      expect(coord.value.x).toBe(1)
      expect(coord.value.y).toBe(2)
    }
  })

  it('should throw error for invalid x', () => {
    const result = Coord.with({ x: -1, y: 1 })
    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value).toEqual(new Error('Invalid coord'))
    }
  })

  it('should throw error for invalid y', () => {
    const result = Coord.with({ x: 1, y: -1 })
    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value).toEqual(new Error('Invalid coord'))
    }
  })

  it('should throw error for non-integer x', () => {
    const result = Coord.with({ x: 1.5, y: 1 })
    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value).toEqual(new Error('Invalid coord'))
    }
  })

  it('should throw error for non-integer y', () => {
    const result = Coord.with({ x: 1, y: 1.5 })
    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value).toEqual(new Error('Invalid coord'))
    }
  })
})
