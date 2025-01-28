import { Router } from "express";

import autenticatioinRouter from "./autenticationRouters.js";
import studentsRouter from "./studentsRouter.js";

const router = Router();
router.use(autenticatioinRouter);
router.use(studentsRouter)

export default router;