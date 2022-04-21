import { IUser } from "./User"

export interface ResponseLogin{
    state: boolean
    message: string
    token:string
    user:IUser
}