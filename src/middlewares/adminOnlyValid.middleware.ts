import { NextFunction, Request, Response } from "express";
import { appError } from "../errors";
import jwt from "jsonwebtoken"
import "dotenv/config"

const adminOnlyIsValidmiddleware = async (req: Request, res: Response, next: NextFunction):Promise<void> =>{

    let token = req.headers.authorization
    const id: number = parseInt(req.params.id);

    if(!token){
        throw new appError("Missing Bearer Token", 401)
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded:any)=>{

        if(error){
            throw new appError(error.message, 401)
        }
        if(decoded.admin === false){
            const sub: number = parseInt(decoded.sub);
            throw new appError("Insufficient Permission", 403)
        }

        return next()
    })


}

export default adminOnlyIsValidmiddleware