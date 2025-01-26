import { Router } from "express";

import { signInController, signUpController } from "../controllers/authenticationControllers";
import { validateSchema } from "../middlewares/validationsMiddlewares";
import { userSignUpSchema } from "../schemas/userSchemas";

const autenticatioinRouter = Router();

autenticatioinRouter.post("/sign-in", signInController)
autenticatioinRouter.post("/sign-up", validateSchema(userSignUpSchema), signUpController)

export default autenticatioinRouter;  