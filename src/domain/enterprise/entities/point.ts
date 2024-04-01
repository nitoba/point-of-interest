import { Entity } from '@/core/entities/entity'
import type { Coord } from '../value-objects/coord'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PointProps {
  name: string
  coord: Coord
}

export class Point extends Entity<PointProps> {
  get name() {
    return this.props.name
  }

  get coord() {
    return this.props.coord
  }

  static create({ name, coord }: PointProps, id?: UniqueEntityID) {
    return new Point({ name, coord }, id)
  }
}
