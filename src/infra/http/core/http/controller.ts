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
}
