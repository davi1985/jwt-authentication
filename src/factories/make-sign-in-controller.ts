import { SignInController } from 'src/application/controller/sign-in-controller'
import { makeSignInUsecase } from './make-sign-in-usecase'

export const makeSignInController = (): SignInController =>
  new SignInController(makeSignInUsecase())
