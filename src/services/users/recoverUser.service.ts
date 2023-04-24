import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { appError } from "../../errors";

const recoverUserService = async (userId: number): Promise<void> => {
  const queryStringIsTrue: string = format(
    `
        SELECT 
            "id", "name", "email", "admin", "active"
        fROM 
            users 
        WHERE 
            id = $1;
        `
  );

  const queryConfingIsTrue: QueryConfig = {
    text: queryStringIsTrue,
    values: [userId],
  };

  const queryResultExist: QueryResult = await client.query(queryConfingIsTrue);

  if (queryResultExist.rows[0].active === true) {
    throw new appError("User already active", 400);
  }

  const queryString: string = `
    UPDATE
        users
    SET
        "active" = true
    WHERE
        id = $1
    RETURNING 
        "id", "name", "email", "admin", "active";
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default recoverUserService;
