import { Router } from "express";
import { allUsersController, createUsersController, retrieveUserController, userDeleteController, userProfileController, userRecoverController, userUpdateeController } from "../controllers/users.controllers";
import ensureUserExistesMiddleware from "../middlewares/ensureUserExists"
import { createUserPatchSchema, createUserSchema } from "../schemas/users.shemas";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware"
import tokenIsValidmiddleware from "../middlewares/ensureTokenIsValid.middleware"
import adminIsValidmiddleware from "../middlewares/adminValid.middleware"
import adminOnlyIsValidmiddleware from "../middlewares/adminOnlyValid.middleware";

const userRoutes: Router = Router()

userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema),  createUsersController )
userRoutes.get("",tokenIsValidmiddleware, adminIsValidmiddleware, allUsersController)
userRoutes.get("/profile",tokenIsValidmiddleware, userProfileController)
userRoutes.delete("/:id",tokenIsValidmiddleware, adminIsValidmiddleware, ensureUserExistesMiddleware, userDeleteController)
userRoutes.patch("/:id",ensureDataIsValidMiddleware(createUserPatchSchema), tokenIsValidmiddleware, adminIsValidmiddleware, ensureUserExistesMiddleware,userUpdateeController)
userRoutes.put("/:id/recover",tokenIsValidmiddleware, adminOnlyIsValidmiddleware, ensureUserExistesMiddleware,userRecoverController )

export default userRoutes