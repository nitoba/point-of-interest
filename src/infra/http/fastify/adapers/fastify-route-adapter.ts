import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Controller } from '../../core/http/controller'

export function fastifyRouteAdapter(controller: Controller) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const response = await controller.handle(request)

    if (response.error) {
      return reply.status(response.status).send(response.error)
    }

    return reply.status(response.status).send(response.data)
  }
}
