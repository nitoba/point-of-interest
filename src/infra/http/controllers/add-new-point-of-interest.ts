import type { AddNewPointOfInterestUseCase } from '@/domain/application/usecases/add-new-point-of-interest'
import { Controller } from '../core/http/controller'

type AddNewPointOfInterestControllerRequest = {
  body: {
    name: string
    x: number
    y: number
  }
}

export class AddNewPointOfInterestController extends Controller<AddNewPointOfInterestControllerRequest> {
  constructor(
    private readonly addNewPointOfInterestUseCase: AddNewPointOfInterestUseCase,
  ) {
    super()
  }

  async handle(req: AddNewPointOfInterestControllerRequest) {
    const { name, x, y } = req.body
    const response = await this.addNewPointOfInterestUseCase.execute({
      name,
      x,
      y,
    })

    if (response.isLeft()) {
      return this.badRequest(response.value)
    }

    return this.created()
  }
}
