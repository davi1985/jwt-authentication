import express from 'express'

import { makeSignInController } from 'src/factories/make-sign-in-controller'
import { makeSignUpController } from 'src/factories/make-sign-up-controller'
import { routeAdapter } from './adapters/route-adapter'
import { makeListLeadsController } from 'src/factories/make-list-leads-controller'
import { middlewareAdapter } from './adapters/middleware-adapter'
import { makeAuthenticationMiddleware } from 'src/factories/make-authentication-middleware'

const app = express()
app.use(express.json())

app.post('/sign-up', routeAdapter(makeSignUpController()))
app.post('/sign-in', routeAdapter(makeSignInController()))

app.get(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController()),
)

app.listen(3001, () => {
  console.log('Server is running on port http://localhost:3001')
})
