import { QueryConfig, QueryResult } from "pg"
import format from "pg-format"
import {IUserWithoutPassword, IUserResult} from "../../interfaces/users.interfaces"
import { client } from "../../database"
import { appError } from "../../errors"

const retriveUserService = async (userId: number): Promise<IUserWithoutPassword> =>{

    const queryString:string = format(
    `
    SELECT 
        "id", "name", "email", "admin", "active"
    fROM 
        users 
    WHERE 
        id = $1;
    `)

    const queryConfing:QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: QueryResult = await client.query(queryConfing)

    return queryResult.rows[0]

}

export default retriveUserService