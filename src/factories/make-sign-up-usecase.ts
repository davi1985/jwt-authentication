import { PasswordHasher } from 'src/application/services/password-hasher'
import { SignUpUseCase } from 'src/application/usecases/signup-usecase'

export const makeSignUpUsecase = (): SignUpUseCase => {
  const passwordHasher = new PasswordHasher()

  return new SignUpUseCase(passwordHasher)
}
