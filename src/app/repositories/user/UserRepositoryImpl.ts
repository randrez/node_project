import { User } from "../../models/entities/User"
import { UserRepository } from "./UserRepository"
import DataSource from '../../../config/dataSource'
import { IUser } from "../../models/User"
import { Auth } from "../../models/entities/Auth"

export class UserRepositoryImpl implements UserRepository {

    async getAll(): Promise<User[]> {
        const repository = DataSource.getRepository(User)
        try {
            const users = await repository.find({});
            return users
        } catch (err) {
            return []
        }
    }

    async getById(id: number): Promise<User | null> {
        try {
            const repository = DataSource.getRepository(User)
            const user = await repository.findOneBy({ id: id })
            return user
        } catch (error) {
            return null
        }
    }

    async updateUser(model: IUser): Promise<number | null> {
        try {
            const { id, firstName, lastName, email } = model
            const repository = DataSource.getRepository(User)
            const userUpdate = await repository.findOneBy({ id: id })
            if (userUpdate != null) {
                userUpdate.firstName = firstName
                userUpdate.lastName = lastName
                userUpdate.email = email
                const updateUser = await repository.save(userUpdate)
                return updateUser.id
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    async delete(id: number): Promise<boolean> {
        let hasDelete: boolean = false
        try {
            const repository = DataSource.getRepository(User)
            const userDelete = await repository.findOneBy({ id: id })
            if (userDelete != null) {
                const user = await repository.remove(userDelete)
                if (user != null) {
                    hasDelete = true
                }
            }
        } catch (error) {
            console.log(error)
        }
        return hasDelete
    }

    async deleteAuthUser(id: number): Promise<boolean> {
        let hasDelete: boolean = false
        try {
            const repositoryUser = DataSource.getRepository(User)
            const userDelete:any = await repositoryUser.findOneBy({ id: id })
            if(userDelete != null){
                const user:any = await repositoryUser.remove(userDelete)
                const repositoryAuth = DataSource.getRepository(Auth)
                const authId = user.auth.id
                const authDelete:any = await repositoryAuth.findOneBy({ id: authId })
                if(authDelete != null){
                    const auth = await repositoryAuth.remove(authDelete)
                    if(auth != null){
                        hasDelete = true
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }

        return hasDelete
    }

}