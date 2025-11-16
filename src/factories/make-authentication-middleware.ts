import { AuthenticationMiddleware } from 'src/application/middlewares/authentication-middleware'
import { makeJwtService } from './make-jwt-service'

export const makeAuthenticationMiddleware = () => {
  const jwtService = makeJwtService()
  return new AuthenticationMiddleware(jwtService)
}
