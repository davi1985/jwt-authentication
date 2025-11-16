import { PasswordHasher } from 'src/application/services/password-hasher'
import { JwtService } from 'src/application/services/jwt-service'
import { SignInUseCase } from 'src/application/usecases/signin-usecase'

export const makeSignInUsecase = (): SignInUseCase => {
  const passwordHasher = new PasswordHasher()
  const jwtService = new JwtService()

  return new SignInUseCase(passwordHasher, jwtService)
}
