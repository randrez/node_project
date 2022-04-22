import { Router } from 'express'
import user from './user'
import auth from './auth'
import {MiddletareToken} from '../middlewares/token.handler'
const routes = Router()

routes.use('/v1/user', MiddletareToken.handleJWT, user)
routes.use('/v1/auth', auth)

export { routes }