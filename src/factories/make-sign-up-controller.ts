import { SignUpController } from 'src/application/controller/sign-up-controller'
import { makeSignUpUsecase } from './make-sign-up-usecase'

export const makeSignUpController = (): SignUpController =>
  new SignUpController(makeSignUpUsecase())
