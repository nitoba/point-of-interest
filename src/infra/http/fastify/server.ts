import type { FastifyInstance } from 'fastify'
import type { Server } from '../core/http/server'
import fastify from 'fastify'
import { pointsRouter } from './routes/points-router'

export class FastifyServer implements Server {
  private readonly app: FastifyInstance
  constructor() {
    this.app = fastify()
    this.registerRoutes()
  }

  private registerRoutes() {
    this.app.register(pointsRouter)
  }

  listen(port: number): void {
    this.app.listen(
      {
        port,
        host: '0.0.0.0',
      },
      (err, address) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        console.log(`Server listening at ${address}`)
      },
    )
  }
}
