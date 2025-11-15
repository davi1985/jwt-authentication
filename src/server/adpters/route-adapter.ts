import { Request, Response } from 'express'
import { IController } from 'src/application/interface/IController'

export const routeAdapter =
  (controller: IController) => async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
    })

    response.status(statusCode).json(body)
  }
