const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { IAuth } from "../../models/Auth"
import { User } from "../../models/entities/User"
import { IUser } from "../../models/User"
import { AuthRepository } from "./AuthRepository"
import DataSource from '../../../config/dataSource'
import { Auth } from "../../models/entities/Auth"
import { ResponseLogin } from "../../models/ResponseLogin"
import { SUCCESS_LOGIN, ERROR_LOGIN } from "../../../config/constants"

export class AuthRepositoryImpl implements AuthRepository {

    async login(username: string, password: string): Promise<ResponseLogin | null> {
        const response: ResponseLogin = { state: false, message: ERROR_LOGIN, token: "", user: { id: 0, firstName: '', lastName: '', email: '' } }
        try {
            const repository = DataSource.getRepository(Auth)
            const auth = await repository.find({ where: { username: username } })
            if (auth != null && this.checkIfUnencryptedPasswordIsValid(auth[0].password, password)) {
                const repositoryUser = DataSource.getRepository(User)
                const user = await repositoryUser.find({where:{ auth: auth[0] }})
                if (user != null) {
                    const tokenData = { username: username, password: this.hashPassword(password) }
                    const token = jwt.sign(tokenData, 'secret_password', {
                        expiresIn: 60 * 60 * 24
                    })
                    response.state = true
                    response.message = SUCCESS_LOGIN
                    response.token = token
                    response.user = { id: user[0].id, firstName: user[0].firstName, lastName: user[0].lastName, email: user[0].email }
                }

            }
        } catch (error: any) {
            response.message = error.message
        }
        return response
    }

    async createUserAuth(modelUser: IUser, modelAuth: IAuth): Promise<User | null> {
        try {
            const { username, password } = modelAuth
            const { firstName, lastName, email } = modelUser
            const repositoryAuth = DataSource.getRepository(Auth)
            const auth = new Auth()
            auth.username = username
            auth.password = this.hashPassword(password)
            auth.createdAt = new Date()
            const authEntity = await repositoryAuth.save(auth)
            if (authEntity != null) {
                const repositoryUser = DataSource.getRepository(User)
                const user = new User()
                user.firstName = firstName
                user.lastName = lastName
                user.email = email
                user.auth = auth
                user.createdAt = new Date()
                const userEntity = repositoryUser.save(user)
                return userEntity
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    public hashPassword(password: string): string {
        return bcrypt.hashSync(password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, password: string): boolean {
        return bcrypt.compareSync(password, unencryptedPassword);
    }
}