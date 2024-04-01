import type { z } from 'zod'

type Res = {
  status: number
  data?: unknown
  error?: {
    message: string
  }
}

type Req = {
  body?: unknown
  query?: unknown
}

export abstract class Controller<T extends Req = Req> {
  abstract handle(request: T): Promise<Res>

  protected validate<S extends z.Schema>(
    schema: S,
    req: T,
  ): z.infer<typeof schema> {
    const result = schema.safeParse(req)

    if (result.success) {
      return result.data
    }

    throw this.badRequest(
      new Error(JSON.stringify(result.error.formErrors.fieldErrors)),
    )
  }

  protected ok(data?: unknown): Res {
    return {
      status: 200,
      data,
    }
  }

  protected created(): Res {
    return {
      status: 201,
    }
  }

  protected badRequest(error: Error): Res {
    return {
      status: 400,
      error: {
        message: error.message,
      },
    }
  }

  isBadRequest(error: ReturnType<typeof this.badRequest>): error is Res {
    return error.status === 400
  }
}
