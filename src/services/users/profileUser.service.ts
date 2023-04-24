import { QueryConfig, QueryResult } from "pg"
import format from "pg-format"
import {IUserWithoutPassword, IUserResult} from "../../interfaces/users.interfaces"
import { client } from "../../database"
import { appError } from "../../errors"
import jwt from "jsonwebtoken"

const profileUserService = async (userId: number): Promise<void> =>{


 
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

export default profileUserService