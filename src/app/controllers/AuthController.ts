import { Request, Response } from 'express'
import { IAuth } from '../models/Auth'
import { IUser } from '../models/User'
import { AuthRepositoryImpl } from '../repositories/auth/AuthRepositoryImpl'
import { KEY } from '../../config/constants'
import { DecryptCrypto } from '../../config/decryptCrypto'

const repository: AuthRepositoryImpl = new AuthRepositoryImpl()
const decryptService: DecryptCrypto = new DecryptCrypto()

export class AuthController {

    public static login(_req: Request, _res: Response) {
        const { username, password } = _req.body
        const passwordDencrypt = decryptService.decrypt(KEY, password.toString())
        repository.login(username, passwordDencrypt).then((login) => {
            return _res.send(login)
        }).catch((error) => {
            return _res.send(error)
        })
    }

    public static create(_req: Request, _res: Response) {
        const { username, password, firstName, lastName, email } = _req.body
        const modelAuth: IAuth = { username, password }
        const modelUser: IUser = { id: 0, firstName, lastName, email }
        repository.createUserAuth(modelUser, modelAuth).then((user) => {
            return _res.send(user)
        }).catch((error) => {
            return _res.send(error)
        })
    }
}
