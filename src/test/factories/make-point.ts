import { Point, type PointProps } from '@/domain/enterprise/entities/point'
import { Coord } from '@/domain/enterprise/value-objects/coord'

export function makePoint(overrideProps?: Partial<PointProps>) {
  return Point.create({
    name: 'Point of Interest 1',
    coord: Coord.with({ x: 1, y: 1 }).value as Coord,
    ...overrideProps,
  })
}
