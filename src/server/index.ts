import express from 'express'

import { makeSignInController } from 'src/factories/make-sign-in-controller'
import { makeSignUpController } from 'src/factories/make-sign-up-controller'

const app = express()
app.use(express.json())

app.post('/sign-up', async (req, res) => {
  const signupController = makeSignUpController()

  const { statusCode, body } = await signupController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.post('/sign-in', async (req, res) => {
  const signinController = makeSignInController()

  const { statusCode, body } = await signinController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.listen(3001, () => {
  console.log('Server is running on port http://localhost:3001')
})
