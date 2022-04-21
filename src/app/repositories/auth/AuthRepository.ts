import { IAuth } from '../../models/Auth'
import { User } from '../../models/entities/User'
import { ResponseLogin } from '../../models/ResponseLogin'
import { IUser } from '../../models/User'

export interface AuthRepository {
    login(username: string, password: string): Promise<ResponseLogin | null>
    createUserAuth(modelUser: IUser, modelAuth: IAuth): Promise<User | null>
}