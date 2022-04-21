import {Router} from 'express'
import { AuthController } from '../app/controllers/AuthController'

const router = Router()

router.post('/login', AuthController.login)
router.post('/create', AuthController.create)

export default router