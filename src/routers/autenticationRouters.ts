import { Router } from "express";

import { signInController, signUpController } from "../controllers/autenticationControllers";

const autenticatioinRouter = Router();

autenticatioinRouter.post("/sign-in", signInController)
autenticatioinRouter.post("/sign-up", signUpController)

export default autenticatioinRouter;  