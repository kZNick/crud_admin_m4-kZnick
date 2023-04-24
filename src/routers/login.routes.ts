import { Router } from "express";
import {loginControlller} from "../controllers/login.controllers"
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import { loginSchema } from '../schemas/login.schema'

const loginRoutes: Router = Router()

loginRoutes.post('', ensureDataIsValidMiddleware(loginSchema) ,loginControlller)

export default loginRoutes