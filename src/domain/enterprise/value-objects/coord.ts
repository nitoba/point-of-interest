import { right, type Either, left } from '@/core/either'
import { ValueObject } from '@/core/entities/value-object'

export type CoordProps = {
  x: number
  y: number
}

export class Coord extends ValueObject<CoordProps> {
  get x() {
    return this.props.x
  }

  get y() {
    return this.props.y
  }

  static with({ x, y }: CoordProps): Either<Error, Coord> {
    if (x < 0 || y < 0 || x !== Math.floor(x) || y !== Math.floor(y)) {
      return left(new Error('Invalid coord'))
    }

    return right(new Coord({ x, y }))
  }
}
