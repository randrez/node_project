import {Router} from 'express'
import UserController from '../app/controllers/UserController'

const router = Router()

router.get('/all', UserController.all)

export default router