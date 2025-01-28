import { Router } from "express";

import { signInController, signUpController } from "../controllers/authenticationControllers.js";
import { validateSchema, validCredentialsMiddleware, validIfUserAlredExistsMiddleware } from "../middlewares/validationsMiddlewares.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/userSchemas.js";
import { generateTokenMiddleware, saveUserDataMiddleware } from "../middlewares/authenticationMiddlewares.js";

const autenticatioinRouter = Router();

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