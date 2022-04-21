import { Request, Response } from 'express'
import { IAuth } from '../models/Auth'
import { IUser } from '../models/User'
import { AuthRepositoryImpl } from '../repositories/auth/AuthRepositoryImpl'
const repository: AuthRepositoryImpl = new AuthRepositoryImpl()

export class AuthController {

    public static login(_req: Request, _res: Response) {
        const { username, password } = _req.body
        repository.login(username, password.toString()).then((login) => {
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
