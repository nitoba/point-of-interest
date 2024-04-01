import type { SearchPointsOfInterestUseCase } from '@/domain/application/usecases/search-points-of-interest'
import { Controller } from '../core/http/controller'
import type { FetchPointsOfInterestUseCase } from '@/domain/application/usecases/fetch-points-of-interest'
import { PointsPresenter } from '../presenters/points-presenter'
import { z } from 'zod'

const searchPointsSchema = z.object({
  query: z.object({
    maxDistance: z.coerce
      .number()
      .positive('max distance must be positive')
      .optional(),
    refX: z.coerce.number().positive('refX must be positive').optional(),
    refY: z.coerce.number().positive('refY must be positive').optional(),
  }),
})

type SearchPointOfInterestControllerRequest = z.infer<typeof searchPointsSchema>

export class SearchPointsOfInterestController extends Controller<SearchPointOfInterestControllerRequest> {
  constructor(
    private readonly searchPointOfInterestUseCase: SearchPointsOfInterestUseCase,
    private readonly fetchPointsOfInterestUseCase: FetchPointsOfInterestUseCase,
  ) {
    super()
  }

  async handle(req: SearchPointOfInterestControllerRequest) {
    const parsedReq = this.validate(searchPointsSchema, req)

    const { maxDistance, refX, refY } = parsedReq.query

    if (!maxDistance || !refX || !refY) {
      const response = await this.fetchPointsOfInterestUseCase.execute()

      return this.ok({ points: response.points.map(PointsPresenter.toHttp) })
    }

    const response = await this.searchPointOfInterestUseCase.execute({
      maxDistance,
      refX,
      refY,
    })

    if (response.isLeft()) {
      return this.badRequest(response.value)
    }

    return this.ok({
      points: response.value.points.map(PointsPresenter.toHttp),
    })
  }
}
