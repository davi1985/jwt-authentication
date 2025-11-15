import { z } from 'zod'
import { IController, IRequest, IResponse } from '../interface/IController'
import { signUpSchema } from './schemas/sign-up-schema'

import { SignUpUseCase } from '../usecases/signup-usecase'
import { AccountAlreadyExistsException } from '../errors/account-already-exists'
import { statusCode } from '../constants/status-code'

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = signUpSchema.parse(body)

      await this.signUpUseCase.execute({ name, email, password })

      return {
        statusCode: statusCode.NO_CONTENT,
        body: null,
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          body: error.issues.map(({ message, path }) => ({
            path: path.join('.'),
            message,
          })),
        }
      }

      if (error instanceof AccountAlreadyExistsException) {
        return {
          statusCode: statusCode.CONFLICT,
          body: {
            error: error.name,
            message: 'Account already exists',
          },
        }
      }

      throw error
    }
  }
}
