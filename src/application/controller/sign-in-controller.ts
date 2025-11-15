import { z } from 'zod'
import { IController, IRequest, IResponse } from '../interface/IController'

import { statusCode } from '../constants/status-code'
import { InvalidCredentialsException } from '../errors/invalid-credentials'
import { SignInUseCase } from '../usecases/signin-usecase'
import { signInSchema } from './schemas/sign-in-schema'

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = signInSchema.parse(body)

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      })

      return {
        statusCode: statusCode.OK,
        body: { accessToken },
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          body: error.issues.map(({ message, path }) => ({
            message,
            path: path.join('.'),
          })),
        }
      }

      if (error instanceof InvalidCredentialsException) {
        return {
          statusCode: statusCode.UNAUTHORIZED,
          body: {
            error: error.name,
            message: error.message,
          },
        }
      }

      throw error
    }
  }
}
