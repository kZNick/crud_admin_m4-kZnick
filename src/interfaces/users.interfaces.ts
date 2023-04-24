import {  QueryResult } from "pg"
import {z} from "zod"
import { createUserSchema } from "../schemas/users.shemas"

type IUserRequest = z.infer<typeof createUserSchema>

// interface IUserRequest {
//     name: string,
//     email: string,
//     password: string
// }

interface IUser extends IUserRequest{
    id: number,
    admin: boolean,
    active: boolean
}

type IUserWithoutPassword = Omit<IUser, "password">
type IUserResult = QueryResult<IUserWithoutPassword>
type IUserResultWithPassword = QueryResult<IUser>

export {
    IUserRequest,
    IUser,
    IUserWithoutPassword,
    IUserResult,
    IUserResultWithPassword
}