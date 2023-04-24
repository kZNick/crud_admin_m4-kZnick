import { QueryConfig, QueryResult } from "pg"
import format from "pg-format"
import {IUserWithoutPassword, IUserResult} from "../../interfaces/users.interfaces"
import { client } from "../../database"

const allUsersService = async (): Promise<Array<IUserWithoutPassword>> =>{

    const queryString:string = format(
    `
    SELECT
        "id", "name", "email", "admin", "active"
    FROM
        users
    WHERE
        active = TRUE;
    `)


    const queryResult: QueryResult = await client.query(queryString)


    return queryResult.rows
}

export default allUsersService