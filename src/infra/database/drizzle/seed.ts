import { makePoint } from '@/test/factories/make-point'
import { db } from './drizzle'
import { points } from './point-schema'

import { Coord } from '@/domain/enterprise/value-objects/coord'
export async function seed() {
  const pointsToAdd = [
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

  await db.insert(points).values(
    pointsToAdd.map((point) => ({
      id: point.id.toString(),
      name: point.name,
      xCoord: point.coord.x,
      yCoord: point.coord.y,
    })),
  )
}

seed().then(() => {
  console.log('Database seeded')
})
