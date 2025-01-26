import { Router } from "express";

import { signInController, signUpController } from "../controllers/authenticationControllers";
import { validateSchema, validIfUserAlredExists } from "../middlewares/validationsMiddlewares";
import { userSignUpSchema } from "../schemas/userSchemas";
import { saveUserDataMiddleware } from "../middlewares/userMiddlewares";

const autenticatioinRouter = Router();

autenticatioinRouter.post("/sign-in", signInController)
autenticatioinRouter.post("/sign-up", validateSchema(userSignUpSchema), validIfUserAlredExists, saveUserDataMiddleware, signUpController)

export default autenticatioinRouter;  