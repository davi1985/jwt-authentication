import express from 'express'

import { SignUpController } from 'src/application/controller/sign-up-controller'
import { SignUpUseCase } from 'src/application/usecases/signup-usecase'
import { PasswordHasher } from 'src/application/services/password-hasher'
import { SignInController } from 'src/application/controller/sign-in-controller'
import { SignInUseCase } from 'src/application/usecases/signin-usecase'
import { TokenGenerator } from 'src/application/services/token-generator'

const app = express()
app.use(express.json())

app.post('/sign-up', async (req, res) => {
  const passwordHasher = new PasswordHasher()
  const signUpUseCase = new SignUpUseCase(passwordHasher)
  const signupController = new SignUpController(signUpUseCase)

  const { statusCode, body } = await signupController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.post('/sign-in', async (req, res) => {
  const passwordHasher = new PasswordHasher()
  const tokenGenerator = new TokenGenerator()
  const signInUseCase = new SignInUseCase(passwordHasher, tokenGenerator)
  const signinController = new SignInController(signInUseCase)

  const { statusCode, body } = await signinController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.listen(3001, () => {
  console.log('Server is running on port http://localhost:3001')
})
