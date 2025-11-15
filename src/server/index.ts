import express from 'express'

import { makeSignInController } from 'src/factories/make-sign-in-controller'
import { makeSignUpController } from 'src/factories/make-sign-up-controller'
import { routeAdapter } from './adpters/route-adapter'

const app = express()
app.use(express.json())

app.post('/sign-up', routeAdapter(makeSignUpController()))
app.post('/sign-in', routeAdapter(makeSignInController()))

app.listen(3001, () => {
  console.log('Server is running on port http://localhost:3001')
})
