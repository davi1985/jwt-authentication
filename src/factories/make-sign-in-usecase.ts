import { PasswordHasher } from 'src/application/services/password-hasher'
import { TokenGenerator } from 'src/application/services/token-generator'
import { SignInUseCase } from 'src/application/usecases/signin-usecase'

export const makeSignInUsecase = (): SignInUseCase => {
  const passwordHasher = new PasswordHasher()
  const tokenGenerator = new TokenGenerator()

  return new SignInUseCase(passwordHasher, tokenGenerator)
}
