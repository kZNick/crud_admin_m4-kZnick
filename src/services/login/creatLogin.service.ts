import { QueryConfig } from "pg";
import { ILoginRequest } from "../../interfaces/login.interface";
import { IUserResultWithPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { appError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createLoginService = async (
  loginData: ILoginRequest
): Promise<string> => {
  const queryStringUserExist: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;
  const queryConfigUserExiste: QueryConfig = {
    text: queryStringUserExist,
    values: [loginData.email],
  };

  const queryResult:IUserResultWithPassword = await client.query(queryConfigUserExiste);

  if (queryResult.rowCount === 0) {
    throw new appError("Wrong email/password", 401);
  }
  if(queryResult.rows[0].active === false){
    throw new appError("Wrong email/password", 401);
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new appError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin
    },
      process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default createLoginService;
