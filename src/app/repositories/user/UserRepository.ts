import { User } from '../../models/entities/User';

export interface UserRepository {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | null>;
    updateUser(user: User): Promise<number | null>;
    delete(id: number): Promise<boolean>;
    deleteAuthUser(id:number):Promise<boolean>;
}