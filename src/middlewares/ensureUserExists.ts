import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { appError } from "../errors";

const ensureUserExistesMiddleware = async (req: Request, res: Response, next: NextFunction ): Promise<Response | void> => {

    const userId: number = parseInt(req.params.id)

    const queryStringUserExist: string = `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1;
`
const queryConfigUserExiste: QueryConfig = {
    text: queryStringUserExist,
    values: [userId]
}

const queryResult: QueryResult = await client.query(queryConfigUserExiste)

if(queryResult.rowCount === 0){
    throw new appError("User not found", 404 )
}

 return next()

}

export default ensureUserExistesMiddleware