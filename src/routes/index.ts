import { Router } from 'express'
import user from './user'
import auth from './auth'

const routes = Router()

routes.use('/v1/user', user)
routes.use('/v1/auth', auth)

export { routes }