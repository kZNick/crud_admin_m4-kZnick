import { IUserRequest, IUserResult, IUserWithoutPassword } from "../../interfaces/users.interfaces"
import { client } from "../../database"
import format from "pg-format"
import { query } from "express"
import { QueryConfig } from "pg"
import { appError } from "../../errors"

const createUsersService = async (userData:IUserRequest): Promise<IUserWithoutPassword> => {

    const queryStringUserExist: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `
    const queryConfigUserExiste: QueryConfig = {
        text: queryStringUserExist,
        values: [userData.email]
    }

    const queryResultExists = await client.query(queryConfigUserExiste)

    if(queryResultExists.rowCount > 0){
        throw new appError("E-mail already registered",409)
    }
    const queryString:string = format(
        `
        INSERT INTO 
            users(%I)
        VALUES
            (%L)
        RETURNING 
        "id", "name", "email", "admin", "active";
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: IUserResult = await client.query(queryString)

    return queryResult.rows[0]

}

export default createUsersService