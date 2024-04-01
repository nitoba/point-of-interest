import type { FastifyInstance } from 'fastify'
import { fastifyRouteAdapter } from '../adapers/fastify-route-adapter'
import { DrizzlePointsRepository } from '@/infra/database/drizzle/repositories/drizzle-points-repository'
import { FetchPointsOfInterestUseCase } from '@/domain/application/usecases/fetch-points-of-interest'
import { AddNewPointOfInterestUseCase } from '@/domain/application/usecases/add-new-point-of-interest'
import { SearchPointsOfInterestUseCase } from '@/domain/application/usecases/search-points-of-interest'
import { AddNewPointOfInterestController } from '../../controllers/add-new-point-of-interest'
import { SearchPointsOfInterestController } from '../../controllers/search-points-of-interest'

export async function pointsRouter(app: FastifyInstance) {
  const repository = new DrizzlePointsRepository()
  const fetchPointsOfInterestUseCase = new FetchPointsOfInterestUseCase(
    repository,
  )

  const addNewPointOfInterestUseCase = new AddNewPointOfInterestUseCase(
    repository,
  )

  const searchPointsOfInterestUseCase = new SearchPointsOfInterestUseCase(
    repository,
  )

  const addNewPointOfInterestController = new AddNewPointOfInterestController(
    addNewPointOfInterestUseCase,
  )

  const searchPointsOfInterestController = new SearchPointsOfInterestController(
    searchPointsOfInterestUseCase,
    fetchPointsOfInterestUseCase,
  )

  app.get('/points', fastifyRouteAdapter(searchPointsOfInterestController))
  app.post('/points', fastifyRouteAdapter(addNewPointOfInterestController))
}
