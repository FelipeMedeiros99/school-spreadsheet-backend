import { Router } from "express";

import { signInController, signUpController } from "../controllers/authenticationControllers";
import { validateSchema, validCredentialsMiddleware, validIfUserAlredExistsMiddleware } from "../middlewares/validationsMiddlewares";
import { userSignInSchema, userSignUpSchema } from "../schemas/userSchemas";
import { generateTokenMiddleware, saveUserDataMiddleware } from "../middlewares/userMiddlewares";

const autenticatioinRouter = Router();

//TODO: generate token 

autenticatioinRouter.post("/sign-in", 
  validateSchema(userSignInSchema),
  validCredentialsMiddleware,
  generateTokenMiddleware,
  signInController
);

autenticatioinRouter.post("/sign-up", 
  validateSchema(userSignUpSchema), 
  validIfUserAlredExistsMiddleware,
  saveUserDataMiddleware, 
  signUpController
);

export default autenticatioinRouter;  