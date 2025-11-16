import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from '../interface/IMiddleware'
import { JwtService } from '../services/jwt-service'

export class AuthenticationMiddleware implements IMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token.',
        },
      }
    }

    try {
      const payload = this.jwtService.verifyToken(authorization)

      return {
        data: {
          accountId: payload.sub,
        },
      }
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token.',
        },
      }
    }
  }
}
