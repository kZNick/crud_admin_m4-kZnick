import {loginSchema} from "../schemas/login.schema"
import {z} from "zod"

type ILoginRequest = z.infer<typeof loginSchema>

export {ILoginRequest }

