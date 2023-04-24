import { QueryConfig, QueryResult } from "pg"
import format from "pg-format"
import { client } from "../../database"
import { appError } from "../../errors"
import {  IUserResultWithPassword } from "../../interfaces/users.interfaces"

const updateUserService = async (userId:number, request:IUserResultWithPassword): Promise<void> =>{

    const orderData = Object.values(request)
    const orderKeys = Object.keys(request)
    
    const formatString: string = format(`
      UPDATE
        users
      SET(%I) = ROW(%L)
      WHERE
        id = $1
      RETURNING 
        "id", "name", "email", "admin", "active";
    `,
    orderKeys,
    orderData
      
    )
  
    const queryConfig: QueryConfig = {
      text: formatString,
      values: [userId]
    }
  

    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default updateUserService